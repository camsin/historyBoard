const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const Image  = mongoose.model('Image');
const User = mongoose.model('User');

var publicationSchema = schema({
  	title: String,
	// imagePreview: {type: Schema.ObjectId, ref: 'Image'},
	imagePreview: String,
	imageBackground: String,
	// imageBackground: {type: Schema.ObjectId, ref: 'Image'},
	state: String,
	// date: Date,
	date: String,
	content: String,
	imageSlider: [String],
	// imageSlider: [{type: Schema.ObjectId, ref: 'Image'}],
	author: {type: schema.ObjectId, ref: 'User'}
 });

let Publication = mongoose.model('Publication',publicationSchema);
 module.exports =  {Publication};
