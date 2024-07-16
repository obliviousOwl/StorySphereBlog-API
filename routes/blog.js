const express = require('express');
const blogController = require('../controllers/blog')

const { verify, verifyNonAdmin } = require('../auth');
const router = express.Router();

router.post('/', verify, verifyNonAdmin, blogController.addPost);

router.get('/', blogController.getAllPosts);

router.get('/:postId', blogController.getSinglePost);

router.patch('/:postId', verify, blogController.updatePost);

router.delete('/:postId', verify, blogController.deletePost);


module.exports = router;