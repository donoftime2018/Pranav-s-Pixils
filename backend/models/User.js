const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema} = mongoose
const {hashSync} = bcrypt

const userSchema = new Schema({
    username: {type: String, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    profilePictureURL: {type: String}
})

userSchema.pre('save', async function (next) {

    console.log(this.password)
    this.password = hashSync(this.password, 10)
    console.log(this.password)
})

const User = mongoose.model('User', userSchema)

module.exports = User