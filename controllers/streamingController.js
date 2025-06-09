const streamingModel = require("../models/streaming");
const cloudinary = require("../config/cloudinary")
const fs = require("fs");

const getStreamingMovie = async (req, res) => {
  try {
    const response = await streamingModel.find();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const postStreamingMovie = async (req, res) => {
  const { title, synopsis, genre, releaseDate, director, link, duration, cast, rating } = req.body;

  // Checks if there is a file in the request (posterUrl)
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" }); 
  }

  try {
    // Upload to Cloudinary directly from the temp path
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "streaming",
    });

    // Optional: delete the file locally after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    const response = await streamingModel.create({
      title,
      synopsis,
      genre,
      releaseDate,
      director,
      posterUrl:result.secure_url,
      link,
      duration,
      cast,
      rating,
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const getStreamingMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await streamingModel.findById(id);
    if (!response) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  getStreamingMovie,
  postStreamingMovie,
  getStreamingMovieById,
};
