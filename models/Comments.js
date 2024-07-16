const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { type: String, required: [true, 'Content is required'] },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
