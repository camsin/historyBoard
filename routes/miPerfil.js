var express = require('express');
var router = express.Router();
const miPerfilController = require('../controlers/miPerfil/miPerfil');

router.get('/', miPerfilController.index);

module.exports = router;
