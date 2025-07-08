const cinemaModel = require("../models/cinema");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const streamifier = require("streamifier");

const postCinemaMovie = async (req, res) => {
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

  // check if all fields are filled
  if (
    !title ||
    !synopsis ||
    !genre ||
    !duration ||
    !releaseDate ||
    !director ||
    !cast ||
    !language ||
    !isNowShowing
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
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

    const response = await cinemaModel.create({
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

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

const editCinemaMovie = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    synopsis,
    genre,
    posterUrl,
    location,
    duration,
    releaseDate,
    director,
    cast,
    language,
    isNowShowing,
    showtimes,
  } = req.body;

  let updatedFields = {title, synopsis, genre, posterUrl, location,duration, releaseDate, director, cast, language, isNowShowing, showtimes,};

  try {
    // try to find cinemamovie
    const cinemaMovie = await cinemaModel.findById(id);

    if (!cinemaMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // updated product
    const updatedCinemaMovie = await cinemaModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );
    res.status(200).json(updatedCinemaMovie); // return the updates cinemaMovie
  } catch (err) {
    console.error(err);
    res.status(500).json("server error ");
  }
};

const deleteCinemaMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await cinemaModel.findByIdAndDelete(id);

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
  postCinemaMovie,
  getCinemaMovie,
  getCinemaMovieById,
  editCinemaMovie,
  deleteCinemaMovie
};
