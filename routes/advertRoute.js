const express = require('express')
const { getAdvert, postAdvert, getAdvertById, editAdvert } = require('../controllers/advertController')
const router = express.Router()

//middleware
const upload = require("../middleware/multer");

router.route("/")
.get(getAdvert)
.post(upload.single("media"), postAdvert) // this allows multer access to the file being received
router.route("/:id")  // get advert by id
.get(getAdvertById)
.put(editAdvert)

module.exports = router

