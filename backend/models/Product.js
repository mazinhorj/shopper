const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Product = db.define('product', {
  code: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  cost_price: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
    required: true
  },
  sales_price: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
    required: true
  }
},
  { timestamps: false }
);



module.exports = Product;