const express = require('express');
const Imagen = require('../../models/imagen');
const Publicacion = require('../../models/publicacion');
var fs = require('fs');


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

    for(var i = 0; i < req.files.length;i++){
        //Primero se recupera el arreglo con7 imagenes y se guardan
        // Se recupera/guarda el id de cada una de esas imagenes
        // Despues se establecen esos ids en las referencias
        let imagen = new Imagen({
           file_id: "1",
           img: {
             data: fs.readFileSync(req.files[i].path),
             contentType: 'image/png'
           }
         });
         imagen.save((err) => {
           if (err) {
             res.render('publicaciones/nueva', {});
           } else {
             res.render('publicaciones/ultimasPublicaciones', {});
           }
        });

    }

  }else{
    res.render('publicacion/nueva', {});
  }
};

function test(req, res, next){

 if(req.params.contenido == 2){
   var arr = [];
   //Ciclo para guardar todas las imagenes que se envian en el form
   for(var i = 0; i < req.files.length;i++){
     //Primero se recupera el arreglo con7 imagenes y se guardan
     // Se recupera/guarda el id de cada una de esas imagenes
     // Despues se establecen esos ids en las referencias
     let imagen = new Imagen({
        file_id: "1",
        img: {
          data: fs.readFileSync(req.files[i].path),
          contentType: 'image/png'
        }
      });
      imagen.save((err) => {
        if (err) {
          res.send('error!!!!');
        } else {
          res.render('publicacion/ultimasPublicaciones', {});
        }
     });

   }
   // Se recuperan los id
   Imagen.find({_id: 0}, (err, result) => {
     for(var i = 0,var z = result.length-8; i < result.length;i++,z++){
       arr[i] = result[z];
     }
  });

  let publicacion = new Publicacion({
    titulo: req.body.title,
    imagenPreview: {type: Schema.ObjectId, ref: 'Imagen'}, //1 imagen
    imagenFondo {type: Schema.ObjectId, ref: 'Imagen'} //1 imagen
    estado: String,
    fecha: Date,
    contenido: String,
    imageneSlider: [{type: Schema.ObjectId, ref: 'Imagen'}], // son 5 imagenes
    autor: {type: Schema.ObjectId, ref: 'Autor'}
   });
   publicacion.save((err) => {
     if (err) {
       res.send('error!!!!');
     } else {
       res.render('publicacion/ultimasPublicaciones', {});
     }
  });


}else{
  res.render('publicacion/test', {});
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
  test,
  misPublicaciones
};
