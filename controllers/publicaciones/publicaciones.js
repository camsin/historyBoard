const express = require('express');
const Image = require('../../models/imagen');
//const Publicacion = require('../../models/publicacion');
var fs = require('fs');

/**
 * Funcion para mostrar/interactuar con el mapa
 */
function mapa(req, res, next){
    res.render('publicaciones/mapa', {showSideNav: true});
};

/**
 * Función para hacer nuestro filtrado de publicaciones por estado
 */
function byEstado(req, res, next){
    res.render('publicaciones/byEstado', {
        estado:req.params.estado, showSideNav: true});
};
/**
 * Función para hacer nuestro filtrado de publicaciones por fecha/año
 */
function byFecha(req, res, next){
    res.render('publicaciones/byFecha', { showSideNav: true});

};
/**
 * Función que nos nuestra la página principal de ultimasPublicaciones
 */
function ultimasPublicaciones(req, res, next){
    res.render('publicaciones/ultimasPublicaciones',{showSideNav: true});

};
/**
 * Función que nos ayuda a mostrar el contenido de una publicación específica
 */
function byId(req, res, next){
    res.render('publicacion/byId', {
        id: req.params.id, showSideNav: true});
        ///Se usa un find que concuerde con el id de la publicacion seleccionada
};
/**
 * Función que nos permite la creación de nuevas publicaciones
 */
function nueva(req, res, next){

  if(req.params.contenido == 2){
    //Primero se recupera el arreglo con7 imagenes y se guardan
    // Se recupera/guarda el id de cada una de esas imagenes
    // Despues se establecen esos ids en las referencias
    /*for(var i = 0; i < req.files.length;i++){
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
    }*/

  }else{
    res.render('publicacion/nueva', {});
  }
};

/**
 * Función de pŕactica
 */
function test(req, res, next){

 if(req.params.contenido == 2){
   var arr = [];
   //Ciclo para guardar todas las imagenes que se envian en el form
   for(var i = 0; i < req.files.length;i++){
     let image = new Image({
        file_id: "1",
        img: {
          data: fs.readFileSync(req.files[i].path),
          contentType: 'image/png'
        }
      });
      image.save((err) => {
        if (err) {
          res.send('error!!!!');
        } else {
          res.render('publicacion/ultimasPublicaciones', {});
        }
     });
   }
   // Se recuperan los id
   /*Imagen.find({_id:0}, (err, result) => {
     var z = result.length;
     z = z - 8;
     for(var i = 0; i < result.length;i++){
       arr[i] = result[z];
       z++;
     }

  });*/

}else{
  res.render('publicacion/test', {});
}

};
/**
 * Función que nos ayuda a mostrar las publicaciones especificas del usuario conectado
 */
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
