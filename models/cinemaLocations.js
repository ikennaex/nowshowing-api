const mongoose = require('mongoose')
const {Schema} = mongoose

const cinemaLocationsSchema = new Schema ({
    name: {type: String, required: true}, 
    address: {type: String, required: true},
    city: {type: String},
    state: {type: String, required: true}
}) 

const cinemaLocationsModel = mongoose.model("CinemaLocations", cinemaLocationsSchema)
module.exports = cinemaLocationsModel