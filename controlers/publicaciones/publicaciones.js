const express = require('express')

function index(req, res, next) {
  res.render('publicaciones/publicaciones',{title: 'publicaciones'});
}

//publicaciones por estado
function byEstado(req, res, next) {
    res.render('publicaciones/byEstado', {
      estado:req.params.estado});
}

//publicaciones por año
function byFecha(req, res, next) {
  res.render('publicaciones/byFecha',
  {fecha:req.params.fecha});
}

//publicacion por ID
function byId(req, res, next) {
  res.render('publicacion/byId', {
    id: req.params.id
  });
}

//Ultimas publicaciones
function ultimasPublicaciones (req, res, next){
  res.render('publicaciones/ultimasPublicaciones',{title: 'ultimas publicaciones'});
}

//Mis publicaciones
function misPublicaciones(req, res, next) {
  res.render('publicaciones/misPublicaciones', { title: 'misPublicaciones' });
}

// Editar publicacion
function editar(req, res, next) {
  res.render('publicacion/editar', {
    contenido: req.params.contenido
  });
}

// Nueva publicacion
function nueva(req, res, next) {
  res.render('publicacion/nueva',
     { title: 'Nueva publicacion' });
}


module.exports = {
  index,
  byEstado,
  byId,
  byFecha,
  ultimasPublicaciones,
  editar,
  misPublicaciones,
  nueva
}
