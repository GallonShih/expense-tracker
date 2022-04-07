// require relative packages
const express = require('express')
const router = express.Router()

// setting router
// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// export
module.exports = router