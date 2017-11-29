const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = mongoose.model('User');
const Image = require('./image');
const enumEstados = ['Aguascalientes','BajaCalifornia','BajaCaliforniaSur', 'Campeche', 'Coahuila', 'Colima',
	'Chiapas', 'Chihuahua', 'DF', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico',
		'Michoacan', 'Morelos', 'Nayarit', 'NuevoLeon', 'Oaxaca', 'Puebla', 'Queretaro', 'QuintanaRoo',
		'SanLuisPotosi', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
		'Yucatan', 'Zacatecas'];


var publicationSchema = schema({
  title: {type: String, required: true},
	imagePreview: {type: schema.ObjectId, ref: 'Image', required:true},
	imageBackground:{type: schema.ObjectId, ref: 'Image', required:true},
	state: {type: String, required:true},
	date: {type: Date, required:true},
	content: {type:String, required:true},
	imageSlider: [{type: schema.ObjectId, ref: 'Image', required:true}],
	author: {type: schema.ObjectId, ref: 'User', required:true},
	likes: {type:Number, default: 0},
	postDate: {type: Date, required:true}
 });

let Publication = mongoose.model('Publication',publicationSchema);
 module.exports =  {Publication, enumEstados};
