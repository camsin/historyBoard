const mongoose = require('mongoose');
const schema = mongoose.Schema;
/**
 * Modelo de las imagenes manejadas en nuestra aplicación
 */
 const imagenSchema = schema({
   file_id: String,
   img: {
     data: Buffer,
     contentType: String
   }
 });

 module.exports = mongoose.model('Imagen',imagenSchema);
