const express = require('express')

function index(req, res, next){
  //res.send("Hola soy la ruta publicacion");
//  res.render('publicacion/publicaciones',{});
}

function id(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicacion/id',{});
}

function nueva(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicacion/nueva',{});
}

function editar(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicacion/editar',{});
}

module.exports = {
  index,
  id,
  nueva,
  editar
}
