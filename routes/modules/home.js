// require relative packages
const express = require('express')
const router = express.Router()
const moment = require('moment')

// require relative js files
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting router
router.get('/', (req, res) => {
  Record.find()
    .populate({ path: 'categoryId' })
    .lean()
    .sort({ date: 'desc' }) // asc/desc
    .then(recordData => {
      let totalAmount = 0
      recordData.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        totalAmount += record.amount
      })
      return res.render('index', { recordData, totalAmount })
    })
    .catch(error => console.error(error))
})

// export
module.exports = router
