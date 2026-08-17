const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username: {type: String, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    profilePictureURL: {type: String}
})

const User = mongoose.model('User', userSchema)

module.exports = User