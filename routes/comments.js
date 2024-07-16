const express = require('express');
const commentController = require('../controllers/comments')

const { verify, verifyAdmin } = require('../auth');
const router = express.Router();

router.post('/:postId', verify, commentController.addComment)

router.get('/:postId', commentController.getComments);

router.delete('/:commentId', verify, verifyAdmin, commentController.deleteComment)

module.exports = router;