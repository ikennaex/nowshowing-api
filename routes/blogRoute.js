const express = require('express')
const { getBlog, postBlog, getBlogById, editBlog, deleteBlog } = require('../controllers/blogController')
const router = express.Router()

//middleware
const upload = require("../middleware/multer");
const verifyAdmin = require('../middleware/auth');

router.route("/")
.get(getBlog)
.post(verifyAdmin, upload.single("img"), postBlog) // this allows multer access to the file being recieved

 router.route("/:id")  // get post by id
.get(getBlogById)
.put(verifyAdmin, editBlog)
.delete(verifyAdmin, deleteBlog)

module.exports = router