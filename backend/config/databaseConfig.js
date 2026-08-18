const mongoose = require('mongoose')
const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4']);

function connectDB()
{
    mongoose.connect(process.env.MONGODB_ATLAS_URI).then(()=>{console.log("Connected")})
}

module.exports = connectDB