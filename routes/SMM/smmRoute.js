const express = require('express')
const { getLikesServices, getFollowersServices, buyLikes, buyFollowers, getCommentServices, buyComments } = require('../../controllers/SMM/smmController')
const { authToken } = require('../../middleware/auth')
const verifyPasscode = require('../../middleware/verifyPasscode')
const router = express.Router()

router.get('/likes', getLikesServices)   
router.get('/followers', getFollowersServices) 
router.get('/comments', getCommentServices)  
router.post('/buy-likes', authToken, verifyPasscode, buyLikes)  
router.post('/buy-followers', authToken, verifyPasscode, buyFollowers)  
router.post('/buy-comments', authToken, verifyPasscode, buyComments)  
module.exports = router  