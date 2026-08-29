const uploadFile = require('../middleware/fileUpload')
const User = require('../models/User')

exports.register = async(req, res, next)=> {
    const imageFile = req.file
    // console.log(imageFile)
    const {username, fName, lName, password, email} = req.body

    // console.log("Username: ", username)
    // console.log("First Name: ", fName)
    // console.log("Last Name: ", lName)
    // console.log("Password: ", password)
    // console.log("Email: ", email)
    
    const fileURL = imageFile
    // console.log(fileURL.path)

    const user = new User({
        username: username,
        firstName: fName,
        lastName: lName,
        password: password,
        email: email
    })

    if (imageFile)
    {
        // console.log(fileURL.path)
        user.profilePictureURL = fileURL.path
    }
    // console.log(user)
    await user.save()


    res.status(200).json({newUser: user})
    
}
