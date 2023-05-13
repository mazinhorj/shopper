require('dotenv').config();
const { Sequelize } = require('sequelize')


const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDialect
})

try {
  sequelize.authenticate()
  console.log('DB connected.')

} catch (error) {
  console.log(`Sorry! DB is not connected: ${err}`)
}

module.exports = sequelize