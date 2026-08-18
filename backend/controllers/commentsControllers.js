const User = require('../models/User')
const Drawing = require('../models/Drawing')

exports.addComment = async(req, res) => {
    const drawingId = req.params.id
    console.log(drawingId)
    const {commentAuthor, comment} = req.body
    console.log(commentAuthor)
    console.log(comment)

    const author = await User.findOne({username: commentAuthor})
    const authorId = author._id
    console.log(author, authorId)

    const drawing = await Drawing.findById({_id: drawingId})
    console.log(drawing)

    // drawing.populate({path: 'comments', populate: {}}).exec()
}