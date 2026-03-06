const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hashPass: { 
        select: false,
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})


const userModel = mongoose.model("User", userSchema)
module.exports = userModel;