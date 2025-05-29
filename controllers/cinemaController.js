const cinemaModel = require("../models/cinema")

const postCinemaMovie = async (req, res) => {
    const {title, synopsis, genre, duration, releaseDate, posterUrl, director, cast, language, isNowShowing} = req.body

    // check if all fields are filled 
    if (!title || !synopsis || !genre || !duration || !releaseDate ||!director ||!cast ||!language ||!isNowShowing ||!posterUrl ||!showtimes
        ||!ticketPrice) {
        return res.status(400).json({ message: "All fields are required" });
      }

    try {
        const response = await cinemaModel.create({title, synopsis, genre, duration, releaseDate, director, cast, language, isNowShowing, showtimes,
            ticketPrice})
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


module.exports = {
    postCinemaMovie,
    getCinemaMovie
}