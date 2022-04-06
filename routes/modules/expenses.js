// require relative packages
const express = require('express')
const router = express.Router()

// require relative js files
const Category = require('../../models/category')
const Record = require('../../models/record')

// setting router
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ sort_no: 'asc' }) // asc/desc
    .then(categoryData => {
      return res.render('new', { categoryData })
    })
})
// submitting new expense
router.post('/', (req, res) => {
  const expenseNew = req.body
  return Record.create(expenseNew)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// export
module.exports = router