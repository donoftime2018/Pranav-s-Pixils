const mongoose = require('mongoose')

function connectDB()
{
    mongoose.connect(process.env.MONGODB_ATLAS_URI).then(()=>{console.log("Connected")})
}

module.exports = connectDB