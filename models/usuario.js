const mongoose = require('mongoose');
const schema = mongoose.Schema;

 const userSchema = schema({
   name:String,
   password:String,
   email:String
 });

 module.exports = mongoose.model('User',userSchema);
