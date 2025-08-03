const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth.js')
const PostController = require('../controller/post.js');

router.post('/',Authentication.auth,PostController.addPost);
router.post('/likeDislike',Authentication.auth,PostController.likeDislikePost);
router.get('/getAllPost',PostController.getAllPost);
router.get('/getAllPostForUser/:userId',PostController.getAllPostForUser);

module.exports = router;