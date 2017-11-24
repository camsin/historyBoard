const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = mongoose.model('User');
const Image = require('./image');

var publicationSchema = schema({
  title: String,
	imagePreview: {type: schema.ObjectId, ref: 'Image'},
	imageBackground:{type: schema.ObjectId, ref: 'Image'},
	state: String,
	date: Date,
	content: String,
	imageSlider: [{type: schema.ObjectId, ref: 'Image'}],
	author: {type: schema.ObjectId, ref: 'User'}
 });

let Publication = mongoose.model('Publication',publicationSchema);
 module.exports =  {Publication};
