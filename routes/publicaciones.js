var express = require('express');
var router = express.Router();
const publicacionesController = require('../controlers/publicaciones/publicaciones');

/* GET users listing. */
router.get('/', publicacionesController.index);

module.exports = router;
