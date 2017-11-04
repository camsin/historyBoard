const express = require('express');
const router = express.Router();
//Controlador
const publicacionesController = require('../controlers/publicaciones/publicaciones');

/*publicaciones
router.get('/', (req, res, next)=> {
  res.render('publicaciones/publicaciones', { title: 'publicaciones' });
});*/

router.get('/', publicacionesController.index);
//publicaciones por estado
router.get('/byEstado/:estado',publicacionesController.byEstado);

//publicaciones por año
router.get('/byFecha/:fecha',publicacionesController.byFecha);

//Ultimas publicaciones
router.get('/ultimasPublicaciones',publicacionesController.ultimasPublicaciones);

//publicacion por ID
router.get('/byId/:id',publicacionesController.byId);
// Editar publicacion
router.get('/editar/:contenido',publicacionesController.editar);
// Nueva publicacion
router.get('/nueva',publicacionesController.nueva);
//Mis publicaciones
router.get('/misPublicaciones',publicacionesController.misPublicaciones);




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
