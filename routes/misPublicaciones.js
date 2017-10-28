var express = require('express');
var router = express.Router();
const misPublicacionesController = require('../controlers/misPublicaciones/misPublicaciones');

/* GET users listing. */
router.get('/', misPublicacionesController.index);

module.exports = router;
