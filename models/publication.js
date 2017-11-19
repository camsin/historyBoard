const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Image  = mongoose.model('Image');
const User = mongoose.model('User');

 const publicationSchema = schema({
  	title: String,
	imagePreview: {type: Schema.ObjectId, ref: 'Image'},
	imageBackground: {type: Schema.ObjectId, ref: 'Image'},
	state: String,
	date: Date,
	content: String,
	imageSlider: [{type: Schema.ObjectId, ref: 'Image'}],
	author: {type: Schema.ObjectId, ref: 'User'}
 });

 module.exports = mongoose.model('Publication',publicationSchema);
