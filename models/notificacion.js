const mongoose = require('mongoose');
const schema = mongoose.Schema;

 const notificacionSchema = schema({
   fecha: Date,
   comentario: { type: Schema.ObjectId, ref:'Comentario'}
 });

 module.exports = mongoose.model('Notificacion',notificacionSchema);
