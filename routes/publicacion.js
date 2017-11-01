var express = require('express');
var router = express.Router();
//const publicacionController = require('../controlers/publicacion/publicacion');


//publicacion por ID
router.get('/byId/:id', function(req, res, next) {
  res.render('publicacion/byId', {
    id: req.params.id
  });
});

router.get('/editar/:contenido', function(req, res, next) {
  console.log(req.params.contenido);
  res.render('publicacion/editar', {
    contenido: req.params.contenido
  });
});

//router.get('/nueva', publicacionController.nueva);
//router.get('/editar', publicacionController.editar);

module.exports = router;
