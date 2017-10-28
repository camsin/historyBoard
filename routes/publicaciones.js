var express = require('express');
var router = express.Router();
const publicacionesController = require('../controlers/publicaciones/publicaciones');

/* GET users listing. */
router.get('/', publicacionesController.index);
router.get('/fecha', publicacionesController.fecha);
router.get('/mapa', publicacionesController.mapa);
router.get('/chihuahua', publicacionesController.chihuahua);

module.exports = router;
