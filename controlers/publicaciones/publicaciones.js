const express = require('express')

function index(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicaciones/publicaciones',{});
};


function byEstado(req, res, next){
  router.get('/byEstado', (req, res, next) => {
    res.render('publicaciones/byEstado', {
      title: 'publicaciones',
      state: 'Chihuahuita'});
  });
};

module.exports = {
  index,
  byEstado
};
