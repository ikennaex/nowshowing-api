const movieModel = require("../models/movies");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const streamifier = require("streamifier");

const postMovie = async (req, res) => {
  const {
    title,
    synopsis,
    genre,
    duration,
    releaseDate,
    director,
    cast,
    language,
    isNowShowing,
  } = req.body;

  try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "cinema" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Create movie after upload success
    const movie = await movieModel.create({
      title,
      synopsis,
      genre,
      posterUrl: result.secure_url,
      duration,
      releaseDate,
      director,
      cast,
      language,
      isNowShowing,
    });

    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


const getMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await movieModel.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await movieModel.findByIdAndDelete(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postMovie,
  getMovies,
  getMovieById,
  editMovie,
  deleteMovie,
};
