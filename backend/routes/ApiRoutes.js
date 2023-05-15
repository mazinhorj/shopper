const router = require('express').Router()

const SSE = require('sse')


const ProductController = require('../controllers/ProductCotroller')
const PackController = require('../controllers/PackController')
const CsvController = require('../controllers/CsvController')
const TesteController = require('../controllers/TesteController')

const { fileUpload } = require('../helpers/file-upload')

// start route
router.post('/home', fileUpload.single('csv_file'), CsvController.sendFile) //

// router.get('/analise', ProductController.getAllProducts)
router.get('/analise', ProductController.newPrices)

router.get('/events', function (req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // cria um objeto SSE
  const sse = new SSE(res);

  // envia a mensagem para o cliente
  sse.send(`O novo preço do produto ${productToUpdate.name} é menor do que o seu custo.`);
});

// product routes
router.get('/products', ProductController.getAllProducts)

// pack routes
router.get('/packs', PackController.getAllPacks)


//  rota de teste
router.get('/teste', TesteController.teste)

module.exports = router