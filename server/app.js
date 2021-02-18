if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var cors = require('cors')
const routes = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})