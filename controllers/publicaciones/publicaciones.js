const express = require('express')

function mapa(req, res, next){
    res.render('publicaciones/mapa', {showSideNav: true});
};

function byEstado(req, res, next){
    res.render('publicaciones/byEstado', {
        estado:req.params.estado, showSideNav: true});
};

function byFecha(req, res, next){
    res.render('publicaciones/byFecha', { showSideNav: true});

};

function ultimasPublicaciones(req, res, next){
    res.render('publicaciones/ultimasPublicaciones',{showSideNav: true});

};

function byId(req, res, next){
    res.render('publicacion/byId', {
        id: req.params.id, showSideNav: true});
};

function nueva(req, res, next){
    res.render('publicacion/nueva', {showSideNav: true,
        contenido: req.params.contenido});
};

function misPublicaciones(req, res, next){
    res.render('publicaciones/misPublicaciones', { showSideNav: true, title: 'misPublicaciones' });
};

module.exports = {
  mapa,
  byEstado,
  byFecha,
  ultimasPublicaciones,
  byId,
  nueva,
  misPublicaciones
};
