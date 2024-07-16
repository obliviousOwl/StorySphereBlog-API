const Blog = require('../models/Blog')
const Comment = require('../models/Comments')
const User = require('../models/User');

module.exports.addComment = async (req, res) => {
    
    const { content } = req.body;
    const postId = req.params.postId;

    try {
        const post = await Blog.findById(postId)
        if(!post) {
            return res.status(404).send({ error: "Post not found" })
        }

        const newComment = new Comment({
            content,
            author: req.user.id,
            blog: postId
        })

        const savedComment = await newComment.save();
        post.comments.push(savedComment._id);
        await post.save();

        return res.status(201).send({ message: 'Comment added successfully', comment: savedComment });
    }
    catch (err) {
        console.log('Error in adding comment', err);
        return res.status(500).send({ message: 'Error in adding comment' })
    }
}

module.exports.getComments = async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({blog: postId}).populate('author');
        if(comments.length <= 0) {
            return res.status(200).send({ error: "No comments found"});
        }
        console.log(comments)
        return res.status(200).send({ comments })
    }
    catch (err) {
        console.log('Error in retreiving comments', err);
        return res.status(500).send({ message: 'Error in retreiving comments' })
    }
}

module.exports.deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    try{
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return res.status(404).send({ error: 'Comment not found' });
        }

        const blog = await Blog.findById(comment.blog);
        if (!blog) {
            return res.status(404).send({ error: 'Post not found' });
        }

        await Comment.deleteOne({ _id: commentId });

        blog.comments.pull(commentId);
        await blog.save();

        return res.status(200).send({ message: 'Comment deleted successfully' });
    }

    catch (err) {
        console.log('Error in deleting comment', err);
        return res.status(500).send({ message: 'Error in deleting comment' })
    }
}