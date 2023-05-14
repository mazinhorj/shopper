const Product = require('../models/Product')
const Pack = require('../models/Pack')
const Csv = require('../models/Csv')

const { Op } = require('sequelize')

const fs = require('fs')
const csvFile = require('fast-csv')
const path = require('path')

module.exports = class ProductController {
  static async getAllProducts(req, res) {
    const products = await Product.findAll()
    res.status(200).json({ products })
  }

  static async newPrices(req, res) {
    let fromFile = []

    const csv_analyzer = await Csv.findOne({ order: [['updatedAt', 'DESC']] })

    let productsToUpdate = await Product.findAll()

    let allIds = productsToUpdate.length
    let ori_prod_ids = { productsToUpdate }
    productsToUpdate.map((id => {
      ori_prod_ids.productsToUpdate.push(parseInt(id.code))
    }))

    ori_prod_ids = productsToUpdate.slice(allIds)

    // console.log(ori_prod_ids)

    const stream = fs.createReadStream(
      path.resolve(__dirname, `../public/csv_files/${csv_analyzer.csv_file}`)
    )

    stream
      .pipe(
        csvFile.parse({
          headers: true
        }))
      .on('error', error => console.log(error))
      .on('data', (row) => {
        parseFloat(row.new_price)
        fromFile.push(row)
      })
      .on('end', rowCount => {
        console.log(`Arquivo com ${rowCount} linhas:`)

        let allNewIds = fromFile.length
        // console.log(`QTY IDS ${allNewIds}`)

        let new_prod_ids = { fromFile }
        fromFile.map((id => {
          new_prod_ids.fromFile.push(parseInt(id.product_code))
        }))
        new_prod_ids = fromFile.slice(allNewIds)


        let allNewPrices = fromFile.length
        // console.log(allNewPrices)
        // console.log(allNewIds)

        let new_prod_prices = { fromFile }
        fromFile.map((price => {
          let nN = parseFloat(price.new_price).toFixed(2)
          new_prod_prices.fromFile.push(parseFloat(nN))
        }))

        let nfromFile = fromFile.slice(0, -((fromFile.length/4)))
        console.log(nfromFile)
        if (nfromFile.includes(NaN)) {
          res.status(422).json({ message: "Seu arquivo contém preços em formato inválido. Por favor carregue um novo arquivo!" })
          return
        } else {
          new_prod_prices = fromFile.slice(0, -allNewIds)
          fromFile = fromFile.slice(0, -allNewIds)
          Product.findAll({
            where: {
              code: {
                [Op.in]: new_prod_ids
              }
            }
          }).then(products => {
            productsToUpdate = products
            // console.log(productsToUpdate)

            // validações
            // existe no arquivo

            if (new_prod_ids.length <= 0 || new_prod_prices.length <= 0) {
              res.status(422).json({ message: "Dados insuficientes. Por favor carregue um novo arquivo!" }) //apontar para a página de carregamento de arquivo
              return
            }

            // console.log(ori_prod_ids, new_prod_ids, new_prod_prices)

            const naoCad = [
              ...new_prod_ids.filter(valor => !ori_prod_ids.includes(valor)),
              // ...ori_prod_ids.filter(valor => !new_prod_ids.includes(valor)),
            ]
            console.log(`NÃO CADASTRADOS: ${naoCad}`)

            if (naoCad > 0) {
              res.status(422).json({ message: `Existe um ou mais produto(s) não cadastrado(s) (CODIGO(S): ${naoCad}). Favor enviar outro arquivo` })
              return
            }

            // preços 

            let precoAbaixo = []
            for (let i = 0; i < (fromFile.length / 3); i++) {
              const productFromFile = fromFile[i];
              const productToUpdate = productsToUpdate.find(product => product.code == productFromFile.product_code);

              if (productToUpdate && parseFloat(productFromFile.new_price) < parseFloat(productToUpdate.cost_price)) {
                console.log(`O novo preço do produto ${productToUpdate.name} é menor do que o seu custo.`);
                precoAbaixo.push(productToUpdate)
                console.log(`PRODUTO: ${productToUpdate.name}, CUSTO: ${productToUpdate.cost_price}, PREÇO ABAIXO: ${productFromFile.new_price}` )
                // return
              }
            }

            let precoAcima = []
            for (let i = 0; i < (fromFile.length / 3); i++) {
              const productFromFile = fromFile[i];
              const productToUpdate = productsToUpdate.find(product => product.code == productFromFile.product_code);

              const comparaNewPrice = (parseFloat(productToUpdate.sales_price)) + (0.1) * (parseFloat(productToUpdate.sales_price))
              // console.log(productToUpdate.code, comparaNewPrice)

              if (productToUpdate && parseFloat(productFromFile.new_price) > parseFloat(comparaNewPrice)) {
                console.log(`O novo preço do produto ${productToUpdate.name} está acima do aumento permitido (10%).`);
                precoAcima.push(productToUpdate)
                console.log(`PRODUTO: ${productToUpdate.name}, CUSTO: ${productToUpdate.sales_price}, PREÇO ACIMA: ${productFromFile.new_price}`)
                // return
              }
            }


            res.status(200).json({ fromFile, productsToUpdate })
          })
        }



      })

  }



  static async checkPrices(newPrices, res) {

  }
}