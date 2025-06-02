const streamingModel = require("../models/streaming")

const getStreamingMovie = async (req, res) => {
    try {
        const response = await streamingModel.find()
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message : "Server Error"})
    }
}

const postStreamingMovie = async (req, res) => {
    const {title,
        synopsis,
        genre,
        posterUrl,
        link,
        duration,
        cast,
        rating} = req.body
    try {
        const response  = await streamingModel.create({title, synopsis, genre, posterUrl, link, duration, cast, rating})
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }

}

const getStreamingMovieById = async (req, res) => {
    const {id} = req.params

    try {
        const response = await streamingModel.findById(id)
        if (!response) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"}) 
    }
}

module.exports = {
    getStreamingMovie,
    postStreamingMovie,
    getStreamingMovieById
}