const mongooose = require("mongoose");
const { Schema } = mongooose;

const advertSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    media: { type: String, required: true }, // URL to the ad media (image/video)
    active: { type: Boolean, default: true },
}, { timestamps: true });

const advertModel = mongooose.model("Advert", advertSchema);
module.exports = advertModel; 