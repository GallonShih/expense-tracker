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
  Record.find({ userId })
    .populate({ path: 'categoryId' })
    .lean()
    .sort({ date: 'desc' }) // asc/desc
    .then(recordData => {
      let totalAmount = 0
      recordData.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        totalAmount += record.amount
      })
      Category.find()
        .lean()
        .sort({ sort_no: 'asc' }) // asc/desc
        .then(categoryData => {
          categoryData.unshift(
            {
              _id: new Object(''),
              name: '類別',
              isSelected: true,
              isDisabled: true
            },
            {
              _id: new Object('all'),
              name: '所有'
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
  const categoryId = req.query.categoryId
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
      })
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
              _id: new Object(''),
              name: '類別',
              isDisabled: true
            },
            {
              _id: new Object('all'),
              name: '所有',
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
