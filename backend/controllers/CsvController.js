const sequelize = require('../db/conn')

const Csv = require('../models/Csv')

module.exports = class CsvController {
  static async sendFile(req, res) {
    let csv_file = ''
    if (req.file) {
      csv_file = req.file.filename
    }
    if (!csv_file) {
      res.status(422).json({ message: "É necessário enviar o arquivo." })
      return
    }
    try {
      await Csv.create({ csv_file })
      // res.status(201).json({ message: `Arquivo inserido com sucesso. Verifique se existem pendências`, csv_file })
      res.send(csv_file)
    } catch (error) {
      res.status(500).json({ message: "Algo não saiu como esperado. Tente de novo: " + error })
    }

  }
}