const mongoose = require('mongoose');
const schema = mongoose.Schema;
const publiSch = require('/publicacion');
const Publicacion  = mongoose.model('Publicacion',publiSch);
const autorSch = require('/usuario');
const Autor = mongoose.model('Autor', autorSch);

 const comentarioSchema = schema({
	publicacion: {type: Schema.ObjectId, ref: 'Publicacion'},
	fecha: Date,
	contenido: String,
	autor: {type: Schema.ObjectId, ref: 'Autor'}
 });

 module.exports = mongoose.model('Comentario',comentarioSchema);
