const express = require('express')
const router = express.Router()
const {getDrawings} = require("../controllers/drawingController")

router.get("/", getDrawings)

module.exports = router