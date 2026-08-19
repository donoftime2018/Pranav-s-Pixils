const uploadFile = require('../middleware/fileUpload')
const Drawing = require('../models/Drawing')
const User = require('../models/User')

exports.create = async(req, res, next)=> {
    const imageFile = req.file
    const {title, author, desc, comments} = req.body

    const authorFound = await User.findOne({username: author})

    console.log("Title: ", title)
    console.log("Author:", author)
    console.log("Description:", desc)
    console.log(authorFound._id)

    if (!imageFile)
    {
        res.status(400).json({error: "No file uploaded"})
    }

    const fileURL = imageFile
    console.log(fileURL.path)

    const drawing = new Drawing({title: title, drawingURL: fileURL.path, author: authorFound._id})
    
    drawing.populate("author")

    if (desc)
    {
        drawing.desc = desc
    }
    await drawing.save()
    console.log(drawing)
    console.log(drawing.author)

    res.status(200).json({drawing: drawing})
    
}
