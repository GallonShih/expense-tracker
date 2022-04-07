// require relative packages
const express = require('express')
const router = express.Router()
const moment = require('moment')

// require relative js files
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting router
router.get('/', (req, res) => {
  const userId = req.user._id
  req.session.categoryId = null
  Record.find({ userId })
    .populate({ path: 'categoryId' })
    .lean()
    .sort({ date: 'desc' }) // asc/desc
    .then(recordData => {
      let totalAmount = 0
      recordData.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        totalAmount += record.amount
        record.amount = record.amount.toLocaleString('en-US')
      })
      totalAmount = totalAmount.toLocaleString('en-US')
      Category.find()
        .lean()
        .sort({ sort_no: 'asc' }) // asc/desc
        .then(categoryData => {
          categoryData.unshift(
            {
              _id: new Object('all'),
              name: '所有類別',
              isSelected: true
            }
          )
          return res.render('index', { recordData, totalAmount, categoryData })
        })
    })
    .catch(error => console.error(error))
})
// category filter
router.get('/filter', (req, res) => {
  const userId = req.user._id
  const recordFilter = { userId: userId }
  const categoryId = req.query.categoryId || req.session.categoryId
  req.session.categoryId = categoryId
  if (req.query.categoryId !== 'all') {
    recordFilter.categoryId = categoryId
  }
  Record.find(recordFilter)
    .populate({ path: 'categoryId' })
    .lean()
    .sort({ date: 'desc' }) // asc/desc
    .then(recordData => {
      let totalAmount = 0
      recordData.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        totalAmount += record.amount
        record.amount = record.amount.toLocaleString('en-US')
      })
      totalAmount = totalAmount.toLocaleString('en-US')
      Category.find()
        .lean()
        .sort({ sort_no: 'asc' }) // asc/desc
        .then(categoryData => {
          categoryData.forEach((category) => {
            if (category._id.equals(categoryId)) {
              category.isSelected = true
            }
          })
          categoryData.unshift(
            {
              _id: new Object('all'),
              name: '所有類別',
              isSelected: true
            }
          )
          return res.render('index', { recordData, totalAmount, categoryData })
        })
    })
    .catch(error => console.error(error))
})

// export
module.exports = router
