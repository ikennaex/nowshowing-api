const streamingModel = require("../models/streaming");
const cloudinary = require("../config/cloudinary");
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

const streamifier = require("streamifier");

const postStreamingMovie = async (req, res) => {
  const {
    title,
    synopsis,
    genre,
    releaseDate,
    director,
    link,
    streamingPlatform,
    duration,
    cast,
    rating,
  } = req.body;

  // Checks if there is a file in the request (posterUrl)
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    // Upload to Cloudinary from memory
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "streaming" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const response = await streamingModel.create({
      title,
      synopsis,
      genre,
      releaseDate,
      director,
      posterUrl: result.secure_url,
      link,
      streamingPlatform,
      duration,
      cast,
      rating,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

const editStreamingMovie = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    synopsis,
    genre,
    releaseDate,
    director,
    link,
    streamingPlatform,
    duration,
    cast,
    rating,
  } = req.body;

  let updatedFields = {
    title, synopsis, genre, releaseDate, director, link,streamingPlatform, duration, cast, rating };

  try {
    // try to find cinemamovie
    const streamingMovie = await streamingModel.findById(id);

    if (!streamingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // updated product
    const updatedStreamingMovie = await streamingModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );
    res.status(200).json(updatedStreamingMovie); // return the updates cinemaMovie
  } catch (err) {
    console.error(err);
    res.status(500).json("server error ");
  }
};

const deleteStreamingMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await streamingModel.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStreamingMovie,
  postStreamingMovie,
  getStreamingMovieById,
  editStreamingMovie,
  deleteStreamingMovie
};
