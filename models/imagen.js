const mongoose = require('mongoose');
const schema = mongoose.Schema;
const postSch = require('/post');
const Post  = mongoose.model('Post',postSch);

 const imgSchema = schema({
   post: { type: Schema.ObjectId, ref:'Post'}
 });

 module.exports = mongoose.model('Img',imgSchema);
