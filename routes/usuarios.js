var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuarios/usuarios');


/* GET home page. */
router.get('/miPerfil', usuariosController.miPerfil);

module.exports = router;
