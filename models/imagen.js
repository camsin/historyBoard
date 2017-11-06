const mongoose = require('mongoose');
const schema = mongoose.Schema;

 const imagenSchema = schema({
   publicacion: { type: Schema.ObjectId, ref:'Publicacion'}
 });

 module.exports = mongoose.model('Imagen',imagenSchema);
