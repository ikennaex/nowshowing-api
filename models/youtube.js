const mongoose = require("mongoose")
const {Schema} = mongoose

const youtubeSchema = new Schema ({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    genre: {type: [String], required: true},
    posterUrl: {type: String, required: true},
    link: {type: String, required: true},
    releaseDate: {type: String, required: true},
    language: {type: String, required: true},
    director: {type: String, required: true},
    duration: {type: String, required: true},
    cast: {type: [String], required: true}, 
    rating: {type: String, required: true},
    
}, { timestamps: true })

const youtubeModel = mongoose.model("Youtube", youtubeSchema)

module.exports = youtubeModel;

