const express = require('express')
const { getLikesServices, getFollowersServices, buyLikes, buyFollowers } = require('../../controllers/SMM/smmController')
const { authToken } = require('../../middleware/auth')
const router = express.Router()

router.get('/likes', getLikesServices)   
router.get('/followers', getFollowersServices)  
router.post('/buy-likes', authToken, buyLikes)  
router.post('/buy-followers', authToken, buyFollowers)  
module.exports = router  