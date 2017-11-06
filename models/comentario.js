const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Publicacion  = mongoose.model('Publicacion');
const Autor = mongoose.model('Autor');

 const comentarioSchema = schema({
	publicacion: {type: Schema.ObjectId, ref: 'Publicacion'},
	fecha: Date,
	contenido: String,
	autor: {type: Schema.ObjectId, ref: 'Autor'}
 });

 module.exports = mongoose.model('Comentario',comentarioSchema);
