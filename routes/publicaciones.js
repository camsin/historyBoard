var express = require('express');
var router = express.Router();
const publicacionesController = require('../controllers/publicaciones/publicaciones');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
let type = upload.array('img', 7);



//MAPA
router.get('/byEstado', publicacionesController.mapa);

//publicaciones por estado
router.get('/byEstado/:estado', publicacionesController.byEstado);

//publicaciones por año
router.get('/byFecha', publicacionesController.byFecha);

//Ultimas publicaciones
router.get('/ultimasPublicaciones', publicacionesController.ultimasPublicaciones);

//publicacion por ID
router.get('/byId/:id', publicacionesController.byId);

// Editar publicacion
// router.get('/editar/:contenido', (req, res, next) => {
//   res.render('publicacion/editar', {showSideNav: true,
//     contenido: req.params.contenido
//   });
// });

// nueva publicacion
router.post('/nueva/:contenido',type, publicacionesController.nueva);
router.get('/nueva',type, publicacionesController.nueva);

///test
router.post('/test/:contenido',type, publicacionesController.test);
router.get('/test',type, publicacionesController.test);
//Mis publicaciones
router.get('/misPublicaciones', publicacionesController.misPublicaciones);


module.exports = router;
