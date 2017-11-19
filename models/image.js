const mongoose = require('mongoose');
const schema = mongoose.Schema;

 const imageSchema = schema({
   file_id: String
 });

 module.exports = mongoose.model('Image',imageSchema);
