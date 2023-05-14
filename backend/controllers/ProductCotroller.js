const Product = require('../models/Product')
const Csv = require('../models/Csv')

const fs = require('fs')
const readline = require("readline")

let csvFile = require('fast-csv')
const path = require('path')

module.exports = class ProductController {
  static async getAllProducts(req, res) {
    const products = await Product.findAll()
    res.status(200).json({ products })
  }

  static async checkPrices(req, res) {
    const products = await Product.findAll()
    const csv_analyzer = await Csv.findOne({ order: [['updatedAt', 'DESC']] })

    const stream = fs.createReadStream(
      path.resolve(__dirname, `../public/csv_files/${csv_analyzer.csv_file}`)
    )
    const rl = readline.createInterface({ input: stream })
    
    let fromfile = []

    // rl.on("line", (row) => {
    //   fromfile.push(row.split(","))
    // })

    // rl.on("close", () => {
    //   console.log(fromfile)
    // })
    stream
      .pipe(
        // streamOut,
        csvFile.parse({
          headers: true
        }))
      .on('data', function (data) {
        fromfile.push(data)
        console.log(data)

      })
      .on('end', () => {
        console.log("Fim do arquivo")
      })


    // console.log(data)
    res.status(200).json({ csv_analyzer, fromfile })
  }
}