const cinemaLocationsModel = require("../models/cinemaLocations")

const getCinemaLocation = async (req, res) => {
    try {
        const response = await cinemaLocationsModel.find()
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}


module.exports = {
    getCinemaLocation 
}