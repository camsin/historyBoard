var express = require('express');
var router = express.Router();
/*
Controlador para estado
const publicacionesController = require('../controlers/publicaciones/publicaciones');
*/
//publicaciones
router.get('/', (req, res, next)=> {
  res.render('publicaciones/publicaciones', { title: 'publicaciones' });
});

//MAPA
router.get('/byEstado', (req, res, next)=> {
  res.render('publicaciones/mapa', {showSideNav: true});
});

//publicaciones por estado
router.get('/byEstado/:estado', (req, res, next)=> {
  res.render('publicaciones/byEstado', {
    estado:req.params.estado, showSideNav: true});
});

//publicaciones por año
router.get('/byFecha/:fecha', (req, res, next)=> {
  res.render('publicaciones/byFecha', {
    fecha:req.params.fecha, showSideNav: true});
});

//Ultimas publicaciones
router.get('/ultimasPublicaciones', (req, res, next)=>{
  res.render('publicaciones/ultimasPublicaciones',{showSideNav: true});
});

//publicacion por ID
router.get('/byId/:id', function(req, res, next) {
  res.render('publicacion/byId', {
    id: req.params.id, showSideNav: true
  });
});
// Editar publicacion
router.get('/editar/:contenido', function(req, res, next) {
  console.log(req.params.contenido);
  res.render('publicacion/editar', {showSideNav: true,
    contenido: req.params.contenido
  });
});
// nueva publicacion
router.get('/nueva/:contenido', function(req, res, next) {
  console.log(req.params.contenido);
  res.render('publicacion/nueva', {showSideNav: true,
    contenido: req.params.contenido
  });
});

//Mis publicaciones
router.get('/misPublicaciones', function(req, res, next) {
  res.render('publicaciones/misPublicaciones', { showSideNav: true, title: 'misPublicaciones' });
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
