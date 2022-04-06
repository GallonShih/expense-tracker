// require relative packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require js files
const routes = require('./routes')
require('./config/mongoose')

// use packages
const app = express()
const PORT = process.env.PORT
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// setting running
app.listen(PORT, () => {
  console.log(`App is running in on http://localhost:${PORT}`)
})
