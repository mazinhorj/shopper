const sequelize = require('../db/conn')
const Pack = require('../models/Pack')
const Product = require('../models/Product')


module.exports = class PackController {
  static async getAllPacks(req, res) {
    const packs = await Pack.findAll({include: Product})

    res.status(200).json({ packs })

  }

}

