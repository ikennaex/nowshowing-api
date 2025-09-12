const mongoose = require("mongoose")
const {Schema} = mongoose

const commentSchema = new Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

const commentModel = mongoose.model("Comment", commentSchema)

module.exports = commentModel;  