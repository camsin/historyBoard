const mongoose = require('mongoose');
const schema = mongoose.Schema;

 const usuarioSchema = schema({
   nombre:String,
   contraseña:String,
   correo:String
 });

 module.exports = mongoose.model('Usuario',usuarioSchema);
