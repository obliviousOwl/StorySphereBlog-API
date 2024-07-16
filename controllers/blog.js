const Blog = require('../models/Blog')
const Comment = require('../models/Comments')
const User = require('../models/User');

module.exports.addPost = async (req, res) => {
    const { title, content } = req.body

    let newPost = new Blog({
        title,
        content,
        author: req.user.id
    })

    try{
        const newBlog = await newPost.save();
        return res.status(201).send(newBlog);
    }
    catch (err) {
        console.log('Error in posting blog',err);
        return res.status(500).send({ message: 'Error in posting blog'})
    }
}

module.exports.getAllPosts = async (req, res) => {
    
    try{
        const posts = await Blog.find({}).populate('comments').populate('author');
        if(posts.length <= 0){
            return res.status(404).send({ error: "No Post Found" })
        }
        return res.status(200).send({posts})
    }
    catch(err){
        console.error('Error in getting Post: ', err);
        return errors.status(500).send({ error: 'Error in getting Post' })
    }
}

module.exports.getSinglePost = async (req, res) => {
    try{
        const post = await Blog.findById(req.params.postId).populate('author');
        if(!post) {
            return res.status(404).send({ error: "Post not found" })
        }
        return res.status(200).send(post)
    }
    catch(err){
        console.error('Error in getting post: ', err);
        return errors.status(500).send({ error: 'Error in getting post' })
    }
}

module.exports.updatePost = async (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body
    const newPost = {
        title,
        content,
    }

    try{
        const post = await Blog.findOne({ _id: postId });
        if(!post){
            return res.status(404).send({error: 'Unable to find post'})
        }
        if(post.author.toString() !== req.user.id){
            return res.status(401).send({error: 'You are not authorized to edit this post'});
        }
        
        const updatedPost = await Blog.findByIdAndUpdate(postId, newPost, { new: true });

        if (!updatedPost) {
            throw new Error('Error updating blog post.');
        }

        return res.status(200).send({message: 'Post updated successfully'})

    }
    catch(err) {
        console.error('Error in updating post: ', err);
        return res.status(500).send({ error: 'Error in updating the post'})
    }
}

module.exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
    try{
        const post = await Blog.findById(postId);

        if (!post) {
            return res.status(404).send({error: 'Unable to find post'})
        }

        if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(401).send({error: 'You are not authorized to delete this post'});
        }
        const comments = await Comment.find({ blog: postId });

        await Blog.deleteOne({ _id: postId });

        await Comment.deleteMany({ blog: postId });

        return res.status(200).send({message: 'Post Deleted Successfully'})
    }
    catch(err) {
        console.error('Error in deleting Post: ', err);
        return res.status(500).send({error:'Error in deleting Post'})
    }
}