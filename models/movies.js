const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  synopsis: String,
  genre: [String],
  duration: String,
  posterUrl: String,
  releaseDate: String,
  director: String,
  cast: [String],
  language: [String],
  isNowShowing: { type: Boolean, default: false }
}, { timestamps: true });

const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel