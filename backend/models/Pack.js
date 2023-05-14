const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Product = require('./Product')

const Pack = db.define('pack', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  qty: {
    type: DataTypes.BIGINT,
    allowNull: false,
    required: true
  }
},
  { timestamps: false },
  );
  
  Pack.belongsTo(Product, { foreignKey: 'pack_id', targetKey: "code", constraints: true })
Pack.belongsTo(Product, { foreignKey: 'product_id', targetKey: "code", constraints: true })

module.exports = Pack;