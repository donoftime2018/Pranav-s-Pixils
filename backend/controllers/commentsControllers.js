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

    const drawing = await Drawing.findByIdAndUpdate(
        {_id: drawingId}, 
        {$push: {
            comments: {
                text: comment,
                author: authorId
            }
        }}, 
        {returnDocument: 'after', upsert: true}
    )
    console.log(drawing)

    res.status(200).send({updatedDoc: drawing})
}