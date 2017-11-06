const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Publicacion  = mongoose.model('Publicacion');

 const imagenSchema = schema({
   publicacion: { type: Schema.ObjectId, ref:'Publicacion'}
 });

 module.exports = mongoose.model('Imagen',imagenSchema);
