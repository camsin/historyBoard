var express = require('express');
var router = express.Router();
const notificacionesController = require('../controllers/notificaciones/notificaciones');

/* GET users listing. */
router.get('/', notificacionesController.index);

module.exports = router;
