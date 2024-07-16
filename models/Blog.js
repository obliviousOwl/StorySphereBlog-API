const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'] },
    content: { type: String, required: [true, 'Content is required'] },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Author is required'] },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
