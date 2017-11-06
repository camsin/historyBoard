var express = require('express');
var router = express.Router();
const publicacionesController = require('../controlers/publicaciones/publicaciones');

/*
Controlador para estado
const publicacionesController = require('../controlers/publicaciones/publicaciones');
*/
//publicaciones
router.get('/', (req, res, next)=> {
  res.render('publicaciones/publicaciones', { title: 'publicaciones' });
});
//publicaciones por estado
router.get('/byEstado/', publicacionesController.byEstado);

//publicaciones por año
router.get('/byFecha/:fecha', (req, res, next)=> {
  res.render('publicaciones/byFecha', {
    fecha:req.params.fecha});
});

//Ultimas publicaciones
router.get('/ultimasPublicaciones', (req, res, next)=>{
  res.render('publicaciones/ultimasPublicaciones',{});
});

//publicacion por ID
router.get('/byId/:id', (req, res, next) => {
  res.render('publicacion/byId', {
    id: req.params.id
  });
});

// Editar publicacion
router.get('/editar/:contenido', (req, res, next) => {
  console.log(req.params.contenido);
  res.render('publicacion/editar', {
    contenido: req.params.contenido
  });
});
//Mis publicaciones
router.get('/', (req, res, next) => {
  res.render('misPublicaciones', { title: 'misPublicaciones' });
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
