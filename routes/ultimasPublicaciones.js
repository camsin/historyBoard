var express = require('express');
var router = express.Router();
const ultimasPublicacionesController = require('../controlers/ultimasPublicaciones/ultimasPublicaciones');

/* GET users listing. */
router.get('/', ultimasPublicacionesController.index);

module.exports = router;
