var express = require('express');
var router = express.Router();
/*
Controlador para estado
const publicacionesController = require('../controlers/publicaciones/publicaciones');
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('publicaciones/publicaciones', { title: 'publicaciones' });
});
//probando
router.get('/byEstado/:estado', function(req, res, next) {
  res.render('publicaciones/byEstado', {
    title: req.params.estado,
    estado:req.params.estado});
});


module.exports = router;
