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
  expenseNew.userId = req.user._id
  return Record.create(expenseNew)
    .then(() => {
      if (req.session.categoryId) {
        res.redirect('/filter')
      } else {
        res.redirect('/')
      }
    })
    .catch(error => console.log(error))
})
// edit expense page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
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
  const expense = req.body
  expense.userId = req.user._id
  Record.findByIdAndUpdate(_id, expense)
    .then(() => {
      if (req.session.categoryId) {
        res.redirect('/filter')
      } else {
        res.redirect('/')
      }
    })
    .catch(err => console.log(err))
})
// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId})
    .then(record => record.remove())
    .then(() => {
      if (req.session.categoryId) {
        res.redirect('/filter')
      } else {
        res.redirect('/')
      }
    })
    .catch(error => console.log(error))
})

// export
module.exports = router