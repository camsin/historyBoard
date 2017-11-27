const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = mongoose.model('User');
const Image = require('./image');
const enumEstados = ['Aguascalientes','Baja California','Baja California Sur', 'Campeche', 'Coahuila de Zaragoza', 'Colima',
	'Chiapas', 'Chihuahua', 'Distrito Federal', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México',
		'Michoacán de Ocampo', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
		'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz de Ignacio de la Llave',
		'Yucatán', 'Zacatecas'];


var publicationSchema = schema({
  title: String,
	imagePreview: {type: schema.ObjectId, ref: 'Image', required:true},
	imageBackground:{type: schema.ObjectId, ref: 'Image', required:true},
	state: {type: String, required:true},
	date: {type: Date, required:true},
	content: {type:String, required:true},
	imageSlider: [{type: schema.ObjectId, ref: 'Image', required:true}],
	author: {type: schema.ObjectId, ref: 'User', required:true}
 });

let Publication = mongoose.model('Publication',publicationSchema);
 module.exports =  {Publication, enumEstados};
