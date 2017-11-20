const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Imagen  = mongoose.model('Imagen');
const Autor = mongoose.model('Usuario');
/**
 * Modelo de las publicaciones
 */
 const publicacionSchema = schema({
  titulo: String,
	imagenPreview: {type: schema.ObjectId, ref: 'Imagen'},
	imagenFondo: {type: schema.ObjectId, ref: 'Imagen'},
	estado: String,
	fecha: String,
	contenido: String,
	imageneSlider: [{type: schema.ObjectId, ref: 'Imagen'}],
	autor: {type: schema.ObjectId, ref: 'Usuario'}
 });

 module.exports = mongoose.model('Publicacion',publicacionSchema);
