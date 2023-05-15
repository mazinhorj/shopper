const Product = require('../models/Product')
const Csv = require('../models/Csv')

const { Op, Sequelize } = require('sequelize')

const fs = require('fs')
const csvFile = require('fast-csv')
const path = require('path')

module.exports = class ProductController {
  static async getAllProducts(req, res) {
    const products = await Product.findAll()
    res.status(200).json({ products })
  }

  static async newPrices(req, res) {

    const csv_analyzer = await Csv.findOne({ order: [['updatedAt', 'DESC']] })
    if (!csv_analyzer) {
      res.status(404).json({ message: "Não foi recebido o arquivo de atualização de preços." })
      return
    }

    let productsToUpdate = await Product.findAll()

    let fromFile = []

    let allIds = productsToUpdate.length
    let ori_prod_ids = { productsToUpdate }
    productsToUpdate.map((id => {
      ori_prod_ids.productsToUpdate.push(parseInt(id.code))
    }))
    ori_prod_ids = productsToUpdate.slice(allIds)

    const filePath = path.resolve(__dirname, `../public/csv_files/${csv_analyzer.csv_file}`)
    // verifica se o arquivo está na pasta de destino
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: "Não encontrei o arquivo de atualização de preços. Faça o upload novamente." })
      return
    }

    // fluxo de leitura do arquivo
    fs.createReadStream(filePath)
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

        // pegar apenas as ids dos produtos que vieram no arquivo para atualizar
        let allNewIds = fromFile.length
        let new_prod_ids = { fromFile }
        fromFile.map((id => {
          new_prod_ids.fromFile.push(parseInt(id.product_code))
        }))
        new_prod_ids = fromFile.slice(allNewIds)

        // pegar apenas os preços dos produtos que vieram no arquivo para atualizar
        let new_prod_prices = { fromFile }
        fromFile.map((price => {
          let nN = parseFloat(price.new_price).toFixed(2)
          new_prod_prices.fromFile.push(parseFloat(nN))
        }))

        let msgs = []
        let msgCusto = {}
        let msgDez = {}

        let updatedProducts = []
        let updatedProduct = {}

        let nfromFile = fromFile.slice(0, -((fromFile.length / 4)))
        
        // verifica se o arquivo tem dados diferentes do esperado
        if (nfromFile.includes(NaN)) {
          res.status(422).json({ message: "Seu arquivo contém preços em formato inválido. Por favor carregue um novo arquivo!" })
          return
        } else {
          new_prod_prices = fromFile.slice(0, -allNewIds)
          fromFile = fromFile.slice(0, -allNewIds)
          // seleciona apenas os produtos a serem atualizados
          Product.findAll({
            where: {
              code: {
                [Op.in]: new_prod_ids
              }
            }
          }).then(products => {
            productsToUpdate = products

            // validações
            // existe no arquivo

            if (new_prod_ids.length <= 0 || new_prod_prices.length <= 0) {
              res.status(422).json({ message: "Por favor carregue um arquivo válido!" }) //apontar para a página de carregamento de arquivo
              return
            }

            // verifica se há produtos no arquivo de atualização que não constam na base da dados
            const naoCad = [
              ...new_prod_ids.filter(valor => !ori_prod_ids.includes(valor)),
            ]
            if (naoCad <= 0) {
              console.log(`Verificando produtos...`)
            } else {
              console.log(`NÃO CADASTRADOS: ${naoCad}`)
            }

            if (naoCad > 0) {
              res.status(422).json({ message: `Existe um ou mais produto(s) não cadastrado(s) (CODIGO(S): ${naoCad}). Cadastre os produtos e recomece a análise.` })
              return
            }

            // validação de preços 
            let precoAbaixo = []
            for (let i = 0; i < (fromFile.length / 3); i++) {
              const productFromFile = fromFile[i];
              const productToUpdate = productsToUpdate.find(product => product.code == productFromFile.product_code);

              if (productToUpdate && parseFloat(productFromFile.new_price) < parseFloat(productToUpdate.cost_price)) {
                msgCusto = {
                  code: productToUpdate.code,
                  message: `O novo preço do produto ${productToUpdate.name} é menor do que o seu custo.`,
                  price: productToUpdate.cost_price,
                  new_price: productFromFile.new_price
                }
                msgs.push(msgCusto)
                precoAbaixo.push(productToUpdate)
              } else {
                updatedProduct = {
                  code: productToUpdate.code,
                  name: productToUpdate.name,
                  updated_price: productFromFile.new_price
                }
                updatedProducts.push(updatedProduct)
              }
            }

            let precoAcima = []
            for (let i = 0; i < (fromFile.length / 3); i++) {
              const productFromFile = fromFile[i]
              const productToUpdate = productsToUpdate.find(product => product.code == productFromFile.product_code)
              const comparaNewPrice = (parseFloat(productToUpdate.sales_price)) + (0.1) * (parseFloat(productToUpdate.sales_price))

              if (productToUpdate && parseFloat(productFromFile.new_price) > parseFloat(comparaNewPrice)) {
                msgDez = {
                  code: productToUpdate.code,
                  message: `O novo preço do produto ${productToUpdate.name} está acima do aumento permitido (10%).`,
                  price: productToUpdate.sales_price,
                  new_price: productFromFile.new_price,
                  max_price: (((parseFloat(productToUpdate.sales_price)) * 0.1) + (parseFloat(productToUpdate.sales_price)))
                }
                msgs.push(msgDez)
                precoAcima.push(productToUpdate)
                // console.log(msgDez)
              } else {
                updatedProduct = {
                  code: productToUpdate.code,
                  name: productToUpdate.name,
                  updated_price: productFromFile.new_price
                }
                updatedProducts.push(updatedProduct)
              }
            }

            const newUpdatedProducts = updatedProducts.slice((updatedProducts.length / 2))

            const msgCustoF = "Validação de custo OK."
            const msgDezF = "Validação de preços OK."

            const toRemove = (new_prod_prices.length / 3)
            let new_prices = new_prod_prices.slice(-toRemove)

            // array pronto para atualização
            const updates = new_prod_ids.map((code, i) => {
              return { code: code, sales_price: new_prices[i] }
            })

            if (msgs.length !== 0) {
              res.status(200).json({ msgs, productsToUpdate })
            } else {
              const codesToUpdate = updates.map(product => product.code)
              // atualiza o banco de dados 
              Product.update(
                { sales_price: Sequelize.literal(`CASE code ${codesToUpdate.map((code, index) => `WHEN ${code} THEN ${new_prices[index]}`).join(' ')} END`) },
                {
                  where:
                    { code: { [Op.in]: codesToUpdate } }
                }
              )
              res.status(200).json({ msgCustoF, msgDezF, newUpdatedProducts })
            }
          })
        }
      })

  }



  static async checkPrices(newPrices, res) {

  }
}