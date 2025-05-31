const express = require('express')
const { getBlog, postBlog, getBlogById } = require('../controllers/blogController')
const router = express.Router()

router.route("/")
.get(getBlog)
.post(postBlog)

 router.route("/:id")  // get post by id
.get(getBlogById)

module.exports = router