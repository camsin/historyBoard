const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Publication  = mongoose.model('Publication');
const User = mongoose.model('User');

 const commentSchema = schema({
	publication: {type: schema.ObjectId, ref: 'Publication'},
	date: Date,
	content: String,
	author: {type: schema.ObjectId, ref: 'User'}
 });

 module.exports = mongoose.model('Comment',commentSchema);
