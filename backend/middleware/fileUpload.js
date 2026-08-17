const {cloudinary, storage} = require('../config/cloudinaryConfig')
const fs = require('fs')

function uploadFile(file) {
  console.log(file)
  return new Promise((resolve, reject)=>{
    cloudinary.uploader.upload(file, (error, result)=>{
      if (error)
      {
        console.log(error)
        reject(error)
      } else {
          console.log(result)
          return resolve({
            url: result.url,
            id: result.public_id
          }, {
                resource_type: "auto", 
                folder: folder
            })
      }
    })
  })
}

module.exports = uploadFile