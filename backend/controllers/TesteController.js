const fs = require('fs')
const csvFile = require('fast-csv')
const path = require('path')
const { Op } = require('sequelize')

const Product = require('../models/Product')
const Csv = require('../models/Csv')

module.exports = class TesteController {
  static async teste(req, res) {
    let fromFile = []

    const csv_analyzer = await Csv.findOne({ order: [['updatedAt', 'DESC']] })

    const productsToUpdate = await Product.findAll()
    let allIds = productsToUpdate.length
    let ori_prod_ids = { productsToUpdate }
    productsToUpdate.map((id => {
      ori_prod_ids.productsToUpdate.push(id.code)
    }))

    ori_prod_ids = productsToUpdate.slice(allIds)

    console.log(ori_prod_ids)

    const stream = fs.createReadStream(
      path.resolve(__dirname, `../public/csv_files/${csv_analyzer.csv_file}`)
    )
      .pipe(
        csvFile.parse({
          headers: true
        }))
      .on('error', error => console.log(error))
      .on('data', row => { fromFile.push(row) })
      .on('end', rowCount => {
        console.log(`Arquivo com ${rowCount} linhas:`)
        // console.log(fromFile)

        let allNewIds = fromFile.length
        let new_prod_ids = { fromFile }
        fromFile.map((id => {
          new_prod_ids.fromFile.push(id.product_code)
        }))
        new_prod_ids = fromFile.slice(allNewIds)

        let allNewPrices = fromFile.length
        let new_prod_prices = { fromFile }
        fromFile.map((price => {
          new_prod_prices.fromFile.push(price.new_price)
        }))
        new_prod_prices = fromFile.slice(allNewPrices)
        // console.log(new_prod_ids, new_prod_prices)


        // validações
        if (new_prod_ids.length <= 0 || new_prod_prices <= 0) {
          res.status(422).json({ message: "Dados insuficientes. Por favor carregue um novo arquivo" }) //apontar para a página de carregamento de arquivo
          return
        }


        res.status(200).json({ fromFile, productsToUpdate })
      })
    // console.log(fromFile)
  }
}

