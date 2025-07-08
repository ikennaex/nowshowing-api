const mongoose = require("mongoose")
const {Schema} = mongoose;

const cinemaSchema = new Schema ({
    title: {type:String},
    synopsis: {type:String},
    genre: {type:[String]},
    duration: {
      type: String, 
    },
    posterUrl:{type:String},  // ch to req
    releaseDate: {type:String}, 
    director: {type:String},
    cast: {type:[String]},
    language: {type:[String]}, 
    isNowShowing: {type:Boolean, default:false},
}, { timestamps: true }
)

const cinemaModel = mongoose.model("Cinema", cinemaSchema)

module.exports = cinemaModel;