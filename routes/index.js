// require relative packages
const express = require('express')
const router = express.Router()

// require js files
const home = require('./modules/home')
const expense = require('./modules/expense')

// use router
router.use('/expenses', expense)
router.use('/', home)

// export
module.exports = router
