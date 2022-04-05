// require relative packages
const express = require('express')
const router = express.Router()

// require relative js files
const Record = require('../../models/record')

// setting router
router.get('/new', (req, res) => {
  return res.render('new')
})

// export
module.exports = router