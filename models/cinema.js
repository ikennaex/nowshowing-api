const mongoose = require("mongoose")
const {Schema} = mongoose;

const cinemaSchema = new Schema ({
    title: {type:String, required: true},
    synopsis: {type:String, required: true},
    genre: {type:[String], required: true},
    duration: {
      type: String, // e.g., "2h 15m"
      required: true,
    },
    location: {type:String, required: true},
    releaseDate: {type:Number, required: true},
    director: {type:String, required: true},
    cast: {type:[String], required: true},
    language: {type:String, required: true},
    isNowShowing: {type:Boolean, default:false, required: true},
}, { timestamps: true }
)

const cinemaModel = mongoose.model("Cinema", cinemaSchema)

module.exports = cinemaModel;