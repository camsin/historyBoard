const mongoose = require('mongoose');
const schema = mongoose.Schema;
const publiSch = require('/publicacion');
const Publicacion  = mongoose.model('Publicacion',publiSch);

 const imagenSchema = schema({
   publicacion: { type: Schema.ObjectId, ref:'Publicacion'}
 });

 module.exports = mongoose.model('Imagen',imagenSchema);
