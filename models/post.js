const mongoose = require('mongoose');
const schema = mongoose.Schema;
const imgSch = require('/img');
const Img  = mongoose.model('Author',imgSchema);
const authorSch = require('/user');
const Author = mongoose.model('Author', authorSchema);

 const postSchema = schema({
  title: String,
	previewImg: {ref: 'Img'},
	backgroundImg {ref: 'Img'}
	state: String,
	date: Date,
	content: String,
	sliderImg: [{ref: 'Img'}],
	autor: {ref: 'Author'}
 });

 module.exports = mongoose.model('Post',postSchema);
