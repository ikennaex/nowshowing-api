const express = require('express')
const router = express.Router()
;
const { postComment, getComments, deleteComment } = require('../controllers/commentController');
const { verifyAdmin } = require('../middleware/auth');

router.route("/")
.post(postComment)
.delete(verifyAdmin, deleteComment)  // must be admin to delete comments

router.route("/:id") // id of the blog to be updated
.get(getComments)



// router.route("/:id")
// .get(getCinemaMovieById)
// .put(verifyAdmin, editCinemaMovie) 
// .delete(verifyAdmin, deleteCinemaMovie)


module.exports = router