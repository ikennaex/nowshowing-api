const express = require('express')
const { getAdvert, postAdvert, getAdvertById, editAdvert } = require('../controllers/advertController')
const router = express.Router()

//middleware
const upload = require("../middleware/multer");

router.route("/")
  .get(getAdvert)
  // this checks to make sure correct error message is passed to the frontend
  .post((req, res, next) => {
    upload.single("media")(req, res, (err) => {
      // Multer file size error
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "File too large. Max 10MB." });
        }
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  }, postAdvert);

router.route("/:id")  // get advert by id
.get(getAdvertById)
.put(editAdvert)

module.exports = router

