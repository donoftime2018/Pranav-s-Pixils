const mongoose = require('mongoose')

function connectDB()
{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log("Connected")})
}

module.exports = connectDB