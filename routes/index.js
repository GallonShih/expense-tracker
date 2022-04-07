// require relative packages
const express = require('express')
const router = express.Router()

// require js files
const home = require('./modules/home')
const users = require('./modules/users')
const expenses = require('./modules/expenses')

// use router
router.use('/users', users)
router.use('/expenses', expenses)
router.use('/', home)

// export
module.exports = router
