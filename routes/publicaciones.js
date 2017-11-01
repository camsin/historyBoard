var express = require('express');
var router = express.Router();
/*
Controlador para estado
const publicacionesController = require('../controlers/publicaciones/publicaciones');
*/
//publicaciones
router.get('/', function(req, res, next) {
  res.render('publicaciones/publicaciones', { title: 'publicaciones' });
});
//publicaciones por estado
router.get('/byEstado/:estado', function(req, res, next) {
  res.render('publicaciones/byEstado', {
    estado:req.params.estado});
});

//publicaciones por año
router.get('/byFecha/:fecha', function(req, res, next) {
  res.render('publicaciones/byFecha', {
    fecha:req.params.fecha});
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
