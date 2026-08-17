const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerSetup')
const {register} = require('../controllers/userAuthControllers')

router.post("/register", upload.single("file"), register)

module.exports = router