const mongoose = require('mongoose');
const schema = mongoose.Schema;
const imgSch = require('/img');
const Img  = mongoose.model('Img',imgSch);
const authorSch = require('/user');
const Author = mongoose.model('Author', authorSch);

 const postSchema = schema({
  title: String,
	previewImg: {type: Schema.ObjectId, ref: 'Img'},
	backgroundImg {type: Schema.ObjectId, ref: 'Img'}
	state: String,
	date: Date,
	content: String,
	sliderImg: [{type: Schema.ObjectId, ref: 'Img'}],
	autor: {ref: 'Author'}
 });

 module.exports = mongoose.model('Post',postSchema);
