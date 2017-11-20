const mongoose = require('mongoose');
const schema = mongoose.Schema;
/**
 * Modelo de los usuarios de la aplicación
 */
 const usuarioSchema = schema({
   nombre:String,
   contraseña:String,
   correo:String
 });

 module.exports = mongoose.model('Usuario',usuarioSchema);
