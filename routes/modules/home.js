// require relative packages
const express = require('express')
const router = express.Router()

// setting router
router.get('/', (req, res)=> {
    res.render('index')
})

// export
module.exports = router