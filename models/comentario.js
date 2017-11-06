const mongoose = require('mongoose');
const schema = mongoose.Schema;
const postSch = require('/post');
const Post  = mongoose.model('Post',imgSch);
const authorSch = require('/user');
const Author = mongoose.model('Author', authorSch);

 const commentSchema = schema({
	post: {type: Schema.ObjectId, ref: 'Post'},
	date: Date,
	content: String,
	autor: {type: Schema.ObjectId, ref: 'Author'}
 });

 module.exports = mongoose.model('Comment',commentSchema);
