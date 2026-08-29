const mongoose = require('mongoose')
const dns = require('dns')

function connectDB()
{
    dns.setServers(['8.8.8.8', '8.8.4.4'])
    mongoose.connect(process.env.MONGODB_ATLAS_URI).then(()=>{console.log("Connected")})
}

module.exports = connectDB