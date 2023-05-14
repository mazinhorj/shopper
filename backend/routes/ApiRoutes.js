const router = require('express').Router()

const ProductController = require('../controllers/ProductCotroller')
const PackController = require('../controllers/PackController')
const CsvController = require('../controllers/CsvController')
const TesteController = require('../controllers/TesteController')

const { fileUpload } = require('../helpers/file-upload')

// start route
router.post('/home', fileUpload.single('csv_file'), CsvController.sendFile) //

// router.get('/analise', ProductController.getAllProducts)
router.get('/analise', ProductController.newPrices)

// product routes
router.get('/products', ProductController.getAllProducts)

// pack routes
router.get('/packs', PackController.getAllPacks)


//  rota de teste
router.get('/teste', TesteController.teste)

module.exports = router