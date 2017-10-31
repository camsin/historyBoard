var express = require('express');
var router = express.Router();
/*
Controlador para estado
const publicacionesController = require('../controlers/publicaciones/publicaciones');
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('publicaciones/publicaciones', { title: 'publicaciones' });
});
//probando
router.get('/byEstado/:estado', function(req, res, next) {
  res.render('publicaciones/byEstado', {
    title: req.params.estado,
    estado:req.params.estado});
});

////chohuahua >:V
/*
router.get('/getBy/:id/:estado/:fecha', (req, res, next)=>{
 let something = {
   id: req.params.id,
   estado: req.params.estado,
   fecha: req.params.fecha
 }

if(something.estado != 'null' && something.fecha != 'null')
  console.log(something);
else if(something.id != 'null'){
    console.log(something);
}
else if(something.estado != 'null'){
  console.log(something);
}
else if(something.fecha != 'null'){
  console.log(something);
}
 res.render('layout');
});*/

module.exports = router;
