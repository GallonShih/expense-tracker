// require relative packages
const express = require('express')
const router = express.Router()

// require js files
const home = require('./modules/home')
const expenses = require('./modules/expenses')

// use router
router.use('/expenses', expenses)
router.use('/', home)

// export
module.exports = router
