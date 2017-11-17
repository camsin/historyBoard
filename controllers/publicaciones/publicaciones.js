const express = require('express');
const Imagen = require('../../models/imagen');
var fs = require('fs');
/*var multer = require('multer');
var upload = multer({ dest: 'uploads/' });*/


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

   if(req.params.contenido == 2){

        let imgPath = '/images/pedro.png';
        let imagen = new Imagen();
        imagen.file_id = "1";
        imagen.img.data = fs.readFileSync(imgPath);
        imagen.img.contentType ='image/png';

         imagen.save((err) => {
           if (err) {
             res.send('error!!!!');
           } else {
             res.send('imagen guardada!!!!');
           }
         });

  }else{
    res.render('publicacion/nueva', {showSideNav: true,
        contenido: req.params.contenido});
  }
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
