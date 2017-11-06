const mongoose = require('mongoose');
const schema = mongoose.Schema;
const comentarioSch = require('/comentario');
const Comentario  = mongoose.model('Comentario',comentarioSch);

 const notificacionSchema = schema({
   fecha: Date,
   comentario: { type: Schema.ObjectId, ref:'Comentario'}
 });

 module.exports = mongoose.model('Notificacion',notificacionSchema);
