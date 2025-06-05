const youtubeModel = require("../models/youtube")

const getYoutubeMovie = async (req, res) => {
    try {
        const response = await youtubeModel.find()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json("Server error")
    }
}

const getYoutubeMovieById = async (req, res) => {
    const {id} = req.params

    try {
        const response = await youtubeModel.findById(id)
        if (!response) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"}) 
    }
}

const postYoutubeMovie = async (req, res) => {
    const {title, desc, genre, posterUrl, link, duration, cast, rating } = req.body

    // check if all fields are filled 

    if (!title ||!desc ||!genre ||!posterUrl ||!link ||!duration ||!cast ||!rating) {
        res.status(500).json("All fields are required")
    }

    try {
        const response = await youtubeModel.create({title, desc, genre, posterUrl, link, duration, cast, rating})
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json("Server error")
    }
}

module.exports = {
    getYoutubeMovie, 
    getYoutubeMovieById,
    postYoutubeMovie
}