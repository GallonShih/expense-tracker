// require relative packages
const express = require('express')
const router = express.Router()

// require js files
const home = require('./modules/home')
const users = require('./modules/users')
const expenses = require('./modules/expenses')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

// use router
router.use('/users', users)
router.use('/expenses', authenticator, expenses)
router.use('/auth', auth)
router.use('/', authenticator, home)

// export
module.exports = router
