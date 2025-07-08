const mongoose = require('mongoose')
const {Schema} = mongoose

const showtimeSchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true
  },
  cinemaLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CinemaLocations",  // Referencing existing schema
    required: true
  },  
  showDate: {
    type: String,
    required: true
  },
  times: {
    type: [String],   // e.g., ["12:00", "3:30", "7:00"]
    required: true
  },
  ticketPrice: {
    type: String
  }
}, { timestamps: true });

const showtimeModel = mongoose.model("Showtime", showtimeSchema);
module.exports = showtimeModel
