const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerSetup')
const {create} = require('../controllers/fileUploadControllers')

router.post("/upload", upload.single("file"), create)

module.exports = router