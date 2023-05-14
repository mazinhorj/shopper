const multer = require('multer')
const path = require('path')


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/csv_files`)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
  }
})

const fileUpload = multer({
  storage: fileStorage,
  limits: { fileSize: '100000' },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error("Formato de arquivo inválido! Utilize apenas .csv."))
    }
    cb(undefined, true)
  }
})

module.exports = { fileUpload }