const mongoose = require('mongoose');
const schema = mongoose.Schema;

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
