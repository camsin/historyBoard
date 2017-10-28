const express = require('express')

function index(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicaciones/publicaciones',{});
}

module.exports = {
  index
}
