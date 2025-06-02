const cinemaModel = require("../models/cinema")

const postCinemaMovie = async (req, res) => {
    const {title, synopsis, genre, duration, releaseDate, posterUrl, director, cast, showtimes, language, isNowShowing} = req.body

    // check if all fields are filled 
    if (!title || !synopsis || !genre || !duration || !releaseDate ||!director ||!cast ||!language ||!isNowShowing ||!posterUrl ||!showtimes) {
        return res.status(400).json({ message: "All fields are required" });
      }

    try {
        const response = await cinemaModel.create({title, synopsis, genre, duration, releaseDate, director, cast, language, isNowShowing, showtimes})
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}

const getCinemaMovie = async (req, res) => {
    try {
        const response = await cinemaModel.find()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server error"})
    }
}

const getCinemaMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await cinemaModel.findById(id)
        if (!response) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}


module.exports = {
    postCinemaMovie,
    getCinemaMovie,
    getCinemaMovieById
}