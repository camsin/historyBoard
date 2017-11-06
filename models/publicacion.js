const mongoose = require('mongoose');
const schema = mongoose.Schema;
const imagenSch = require('/imagen');
const Imagen  = mongoose.model('Imagen',imagenSch);
const autorSch = require('/usuario');
const Autor = mongoose.model('Autor', autorSch);

 const publicacionSchema = schema({
  titulo: String,
	imagenPreview: {type: Schema.ObjectId, ref: 'Imagen'},
	imagenFondo {type: Schema.ObjectId, ref: 'Imagen'}
	estado: String,
	fecha: Date,
	contenido: String,
	imageneSlider: [{type: Schema.ObjectId, ref: 'Imagen'}],
	autor: {type: Schema.ObjectId, ref: 'Autor'}
 });

 module.exports = mongoose.model('Publicacion',publicacionSchema);
