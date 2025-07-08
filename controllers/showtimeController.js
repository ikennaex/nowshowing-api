const showtimeModel = require("../models/showtimes");

const postShowtime = async (req, res) => {
    try {
        const showtime = await showtimeModel.create(req.body);
        res.status(201).json({ message: "Showtime created successfully", showtime });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getShowtimes = async (req, res) => {
    try {
        const showtimes = await showtimeModel.find().populate('movie').populate('cinemaLocation');
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getShowtimesByMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const showtimes = await showtimeModel.find({ movie: id }).populate('cinemaLocation');
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getShowtimesByCinema = async (req, res) => {
    const { cinemaId } = req.params;
    try {
        const showtimes = await showtimeModel.find({ cinemaLocation: cinemaId }).populate('movie');
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getShowtimesByDate = async (req, res) => {
    const { date } = req.params;
    try {
        const showtimes = await showtimeModel.find({ showDate: date }).populate('movie').populate('cinemaLocation');
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editShowtime = async (req, res) => {
    const { id } = req.params;
    try {
        const showtime = await showtimeModel.findByIdAndUpdate(id, req.body, { new: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteShowtime = async (req, res) => {
    const { id } = req.params;
    try {
        const showtime = await showtimeModel.findByIdAndDelete(id);
        if (!showtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }
        res.status(200).json({ message: "Showtime deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}

module.exports = {
    postShowtime,
    getShowtimes,
    getShowtimesByMovie,
    getShowtimesByCinema,
    editShowtime,
    getShowtimesByDate,
    deleteShowtime
};