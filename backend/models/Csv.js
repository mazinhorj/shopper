const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Csv = db.define('csv', {

  csv_file: {
    type: DataTypes.STRING
  }

});

module.exports = Csv