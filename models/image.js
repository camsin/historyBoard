const mongoose = require('mongoose');
const schema = mongoose.Schema;
/**
 * Modelo de las imagenes manejadas en nuestra aplicación
 */
 const imageSchema = schema({
   file_id: String,
   img: {
     data: Buffer,
     contentType: String
   }
 });

 module.exports = mongoose.model('Image',imageSchema);
