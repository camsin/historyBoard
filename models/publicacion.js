const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Imagen  = mongoose.model('Imagen');
const Autor = mongoose.model('Usuario');
/**
 * Modelo de las publicaciones
 */
 const publicacionSchema = schema({
  titulo: String,
	imagenPreview: {type: Schema.ObjectId, ref: 'Imagen'},
	imagenFondo: {type: Schema.ObjectId, ref: 'Imagen'},
	estado: String,
	fecha: Date,
	contenido: String,
	imageneSlider: [{type: Schema.ObjectId, ref: 'Imagen'}],
	autor: {type: Schema.ObjectId, ref: 'Usuario'}
 });

 module.exports = mongoose.model('Publicacion',publicacionSchema);
