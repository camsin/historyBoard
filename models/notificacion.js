const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Comentario  = mongoose.model('Comentario');
/**
 * Modelo de las notificaciones de cada comentario por publicacion
 */
 const notificacionSchema = schema({
   fecha: Date,
   comentario: { type: Schema.ObjectId, ref:'Comentario'}
 });

 module.exports = mongoose.model('Notificacion',notificacionSchema);
