// cloudinary
const cloudinary = require('cloudinary').v2
require('dotenv').config();

// cloudinary config
cloudinary.config({
  cloud_name: 'dyjjkofoo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

console.log(process.env.CLOUDINARY_API_KEY)

module.exports = cloudinary; 