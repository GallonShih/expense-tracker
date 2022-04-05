// use environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require relative js files
const Category = require('../category')
const db = require('../../config/mongoose')

// require relative data
const categoryList = require('./category.json').result

// put seed data into db
db.once('open', () => {
  const categoryPromises = []
  categoryList.forEach(function (seedCategory) {
    categoryPromises.push(
      Category.findOne({ name: seedCategory.name })
        .then(category => {
          if (category) {
            console.log(`Seed category ${seedCategory.name} already exists.`)
          } else {
            console.log(`Start creating Seed category ${seedCategory.name}.`)
            return Category.create({
              name: seedCategory.name,
              icon: seedCategory.icon
            })
          }
        })
    )
  })
  Promise.all(categoryPromises)
    .then(() => {
      console.log('categorySeeder done.')
      process.exit()
    })
})