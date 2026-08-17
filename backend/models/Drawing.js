const mongoose = require('mongoose')
const {Schema} = mongoose
const User = require('./User.js')

const drawingSchema = new Schema({
    title: {type: String, require: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    drawingURL: {type: String, require: true},
    desc: {type: String},
    comments: [{
        text: {type: String},
        author: {type: Schema.Types.ObjectId, ref: 'User'}
    }]
})

const Drawing = mongoose.model('Drawing', drawingSchema)

module.exports = Drawing