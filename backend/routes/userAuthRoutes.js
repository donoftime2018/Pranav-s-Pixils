const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerSetup')
const {register, updateProfileInfo} = require('../controllers/userAuthControllers')

router.post("/register", upload.single("file"), register)
router.patch("/updateProfile/:id", upload.single("file"), updateProfileInfo)

module.exports = router