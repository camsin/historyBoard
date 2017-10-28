const express = require('express')

function index(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicaciones/publicaciones',{});
}

function fecha(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicaciones/fecha',{});
}

function mapa(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicaciones/mapa',{});
}

function chihuahua(req, res, next){
  //res.send("Hola soy la ruta publicacion");
  res.render('publicaciones/chihuahua',{});
}

module.exports = {
  index,
  fecha,
  mapa,
  chihuahua
}
