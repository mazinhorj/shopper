const router = require('express').Router()

const ProductController = require('../controllers/ProductCotroller')
const PackController = require('../controllers/PackController')
const CsvController = require('../controllers/CsvController')

const { fileUpload } = require('../helpers/file-upload')

// send route
router.post('/send', fileUpload.single('csv_file'), CsvController.sendFile) //

router.get('/analise', ProductController.newPrices)


// product routes
router.get('/products', ProductController.getAllProducts)

// pack routes
router.get('/packs', PackController.getAllPacks)


module.exports = router