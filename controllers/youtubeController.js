const youtubeModel = require("../models/youtube");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const getYoutubeMovie = async (req, res) => {
  try {
    const response = await youtubeModel.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

const getYoutubeMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await youtubeModel.findById(id);
    if (!response) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const streamifier = require("streamifier");

const postYoutubeMovie = async (req, res) => {
  const {
    title,
    desc,
    genre,
    link,
    duration,
    releaseDate,
    language,
    cast,
    director,
    rating,
  } = req.body;

  // check if all fields are filled
  if (
    !title ||
    !desc ||
    !genre ||
    !link ||
    !duration ||
    !cast ||
    !rating ||
    !releaseDate ||
    !language ||
    !director
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    // Upload to Cloudinary from buffer
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "youtube" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const response = await youtubeModel.create({
      title,
      desc,
      genre,
      posterUrl: result.secure_url,
      link,
      duration,
      cast,
      rating,
      releaseDate,
      language,
      director,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const editYoutubeMovie = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    desc,
    genre,
    link,
    duration,
    releaseDate,
    language,
    cast,
    director,
    rating,
  } = req.body;

  let updatedFields = {    title,
    desc,
    genre,
    link,
    duration,
    releaseDate,
    language,
    cast,
    director,
    rating,};

  try {
    // try to find cinemamovie
    const youtubeMovie = await youtubeModel.findById(id);

    if (!youtubeMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // updated product
    const updatedYoutubeMovie = await youtubeModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );
    res.status(200).json(updatedYoutubeMovie); // return the updates cinemaMovie
  } catch (err) {
    console.error(err);
    res.status(500).json("server error ");
  }
};

const deleteYoutubeMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await youtubeModel.findByIdAndDelete(id);

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
  getYoutubeMovie,
  getYoutubeMovieById,
  postYoutubeMovie,
  editYoutubeMovie,
  deleteYoutubeMovie
};
