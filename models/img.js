const mongoose = require('mongoose');
const schema = mongoose.Schema;
const authorSch = require('/user');
const Author = mongoose.model('_id', authorSch.userSchema);

 const imgSchema = schema({
   post: {ref:'Author'}
 });

 module.exports = mongoose.model('Img',imgSchema);
