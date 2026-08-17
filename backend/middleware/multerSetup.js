const multer = require('multer')
const path = require('path')
const fs = require('fs')
const {storage} = require('../config/cloudinaryConfig')

// const uploadDir = path.join(__dirname, '../public/tmp')
// fs.mkdirSync(uploadDir, { recursive: true })

// const storage = multer({
//     dest: "uploads/"
// })

const upload = multer({ storage })

module.exports = upload