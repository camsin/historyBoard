const mongoose = require('mongoose');
const schema = mongoose.Schema;

 const imagenSchema = schema({
   file_id: String
 });

 module.exports = mongoose.model('Imagen',imagenSchema);
