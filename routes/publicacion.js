var express = require('express');
var router = express.Router();
const publicacionController = require('../controlers/publicacion/publicacion');

/* GET users listing. */
//router.get('/', publicacionController.index);
router.get('/id', publicacionController.id);
router.get('/nueva', publicacionController.nueva);
router.get('/editar', publicacionController.editar);

module.exports = router;
