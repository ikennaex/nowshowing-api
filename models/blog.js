const mongoose = require("mongoose")
const { applyTimestamps } = require("./cinema")
const {Schema} = mongoose

const blogSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    img: {type: String, required: true},
}, { timestamps: true }
)

const blogModel = mongoose.model("Blog", blogSchema)

module.exports = blogModel;