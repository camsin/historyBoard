const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = mongoose.model('User');
const Image = require('./image');
var publicationSchema = schema({
  title: String,
	imagePreview: {type: schema.ObjectId, ref: 'Image', required:true},
	imageBackground:{type: schema.ObjectId, ref: 'Image', required:true},
	state: {type: String, required:true},
	date: {type: Date, required:true},
	content: {type:String, required:true},
	imageSlider: [{type: schema.ObjectId, ref: 'Image', required:true}],
	author: {type: schema.ObjectId, ref: 'User', required:true}
 });

let Publication = mongoose.model('Publication',publicationSchema);
 module.exports =  {Publication};
