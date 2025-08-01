const express = require('express')
const { getBlog, postBlog, getBlogById, editBlog, deleteBlog } = require('../controllers/blogController')
const router = express.Router()

//middleware
const upload = require("../middleware/multer");

router.route("/")
.get(getBlog)
.post(upload.single("img"), postBlog) // this allows multer access to the file being recieved

 router.route("/:id")  // get post by id
.get(getBlogById)
.put(editBlog)
.delete(deleteBlog)

module.exports = router