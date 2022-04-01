// require relative packages
const express = require('express')
const router = express.Router()

// require js files
const home = require('./modules/home')

// use router
router.use('/', home)

// export
module.exports = router