const cinemaModel = require("../models/cinema");
const cloudinary = require("../config/cloudinary")
const fs = require("fs");

const postCinemaMovie = async (req, res) => {
  const {
    title,
    synopsis,
    genre,
    duration,
    releaseDate,
    director,
    cast,
    showtimes,
    location,
    language,
    isNowShowing,
  } = req.body;

  // check if all fields are filled
  if (
    !title ||
    !synopsis ||
    !genre ||
    !duration ||
    !releaseDate ||
    !director ||
    !location ||
    !cast ||
    !language ||
    !isNowShowing ||
    !showtimes
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Checks if there is a file in the request (posterUrl)
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    // Upload to Cloudinary directly from the temp path
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cinema",
    });

    // Optional: delete the file locally after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    const response = await cinemaModel.create({
      title,
      synopsis,
      genre,
      posterUrl:result.secure_url,
      location,
      duration,
      releaseDate,
      director,
      cast,
      language,
      isNowShowing,
      showtimes,
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const getCinemaMovie = async (req, res) => {
  try {
    const response = await cinemaModel.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getCinemaMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await cinemaModel.findById(id);
    if (!response) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  postCinemaMovie,
  getCinemaMovie,
  getCinemaMovieById,
};
