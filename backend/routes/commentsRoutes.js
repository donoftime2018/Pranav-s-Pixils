const express = require('express')
const router = express.Router()
const {addComment} = require('../controllers/commentsControllers')

router.post("/addComment/:id", addComment)

module.exports = router