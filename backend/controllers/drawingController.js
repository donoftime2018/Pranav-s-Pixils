const Drawing = require("../models/Drawing")

exports.getDrawings = async(req, res)=>{
    const drawings = await Drawing.find({}).populate("author").populate("comments.author")
    console.log(drawings)
    res.status(200).send({drawings: drawings})
}