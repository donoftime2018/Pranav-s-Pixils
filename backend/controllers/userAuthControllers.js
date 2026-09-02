const User = require('../models/User')

exports.register = async(req, res, next)=> {
    const imageFile = req.file
    console.log(imageFile)
    const {username, fName, lName, password, email} = req.body

    console.log("Username: ", username)
    console.log("First Name: ", fName)
    console.log("Last Name: ", lName)
    console.log("Password: ", password)
    console.log("Email: ", email)
    
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
        console.log(fileURL.path)
        user.profilePictureURL = fileURL.path
    }
    console.log(user)
    await user.save()


    res.status(200).json({newUser: user})
    
}

exports.updateProfileInfo = async(req, res, next)=> {
    const {id} = req.params
    console.log(id)
    const userDoc = await User.findById(id).exec()
    console.log(userDoc)
    const {username, email, fName, lName, password} = req.body

    console.log(username)
    console.log(email)
    console.log(fName)
    console.log(lName)
    console.log(password)
    const imageFile = req.file

    if (username)
    {
        userDoc.username = username
    }
    if (email)
    {
        userDoc.email = email

    }
    if (fName)
    {
        userDoc.firstName = fName
    }
    if (lName)
    {
        userDoc.lastName = lName
    }
    if (password)
    {
        userDoc.password = password
    }
    if (imageFile)
    {
        console.log(imageFile.path)
        userDoc.profilePictureURL = imageFile.path
    }

    if (userDoc.isModified())
        await userDoc.save()

    console.log(userDoc)

    res.status(200).json(userDoc)
}

async function updateProfilePic(req, res, next)
{

}