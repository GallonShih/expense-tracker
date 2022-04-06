// require relative packages
const express = require('express')
const router = express.Router()
const moment = require('moment')

// require relative js files
const Category = require('../../models/category')
const Record = require('../../models/record')

// setting router
// new expense page
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
// edit expense page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  return Record.findById({ _id })
    .populate({ path: 'categoryId' })
    .lean()
    .then((recordData) => {
      recordData.date = moment(recordData.date).format('YYYY-MM-DD')
      Category.find()
        .lean()
        .sort({ sort_no: 'asc' }) // asc/desc
        .then(categoryData => {
          categoryData.forEach((category) => {
            if (category._id.equals(recordData.categoryId._id)) {
              category.isSelected = true
            } else {
              category.isSelected = false
            }
          })
          return res.render('edit', { recordData, categoryData })
        })
    })
})
// submitting edit page
router.put('/:id', (req, res) => {
  const _id = req.params.id
  Record.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

// export
module.exports = router