const mongoose = require('mongoose'); // importar mongoose
// Luego creamos nuestro schema
const schema = mongoose.Schema; // La variable que trae mongoose se refiere como Schema (con S mayuscula)

 const userSchema = schema({
   name:String,
   password:String,
   email:String
 });

 //exportar schema

 module.exports = mongoose.model('User',userSchema);
 // module.exports = mongoose.mosel('nombre del schema',Schema del cod que pasamos como parametro);
