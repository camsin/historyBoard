const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Imagen  = mongoose.model('Imagen');
const Autor = mongoose.model('Autor');

 const publicacionSchema = schema({
  titulo: String,
	imagenPreview: {type: Schema.ObjectId, ref: 'Imagen'}, //1 imagen
	imagenFondo {type: Schema.ObjectId, ref: 'Imagen'} //1 imagen
	estado: String,
	fecha: Date,
	contenido: String,
	imageneSlider: [{type: Schema.ObjectId, ref: 'Imagen'}], // son 5 imagenes
	autor: {type: Schema.ObjectId, ref: 'Autor'}
 });

 module.exports = mongoose.model('Publicacion',publicacionSchema);
