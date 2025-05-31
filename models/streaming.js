const mongoose = require("mongoose")
const {Schema} = mongoose

const streamingSchema = new Schema ({
    title: {type: String, required: true},
    synopsis: {type: String, required: true},
    genre: {type: [String], required: true},
    posterUrl: {type: String, required: true},
    link: {type: String, required: true},
    duration: {type: String, required: true},
    cast: {type: [String], required: true},
    rating: {type: String, required: true}, 
}, { timestamps: true }
)

const streamingModel = mongoose.model("Streaming", streamingSchema)

module.exports = streamingModel;