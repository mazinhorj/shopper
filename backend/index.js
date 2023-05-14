require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()

app.use(
  express.json()
)

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(cors({
  credentials: true, origin: 'http://localhost:5000'
}))

//routes
const ApiRoutes = require('./routes/ApiRoutes')
app.use('/api', ApiRoutes)

app.use(express.static('public'))

const conn = require('./db/conn');
try {
  conn
    // .sync({ force: true })
    .sync()
}
catch (err) { console.log("Não conectou ao DB: " + err.message) };

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server status: Loaded and running on port ${PORT}.`);
});