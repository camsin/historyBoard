const express = require('express');
let Publication = require('../../models/publication.js').Publication;
let User = require('../../models/user.js').User;
const Image = require('../../models/image.js');
const fs = require('fs');

function map(req, res, next) {
    res.render('publications/map', {showSideNav: true, user: req.user});
};

function byState(req, res, next) {
    res.render('publications/byState', {
        estado: req.params.state, showSideNav: true, user: req.user
    });
};

function byDate(req, res, next) {
    res.render('publications/byDate', {showSideNav: true, user: req.user});

};

function lastPublications(req, res, next) {
    res.render('publications/lastPublications', {showSideNav: true, user: req.user});
};

function getMyPublications(req, res, next) {
    console.log("SI ENTRE A ESTO", req.user);
    Publication.find({"author": req.user._id}).exec(function (err, publications) {
        if (err) {
            return res.json(err);
        }
        // if (publications.length != 0) {
        //     console.log("NO ES CERO");
            return res.json(publications);
        // } else {
        //     console.log("ES CERO ALB");
        //     return res.json("{}");
        // }
        console.log("PUBLICATIONS ", publications);

    });
};

function getAllPublications(req, res, next) {
    console.log("SI ENTRE A ESTO", req.user);
    Publication.find({}).exec(function (err, publications) {
        if (err) {
            return res.json(err);
        }
        // if (publications.length != 0) {
        //     console.log("NO ES CERO");
            return res.json(publications);
        // } else {
        //     console.log("ES CERO ALB");
        //     return res.json("{}");
        // }
        console.log("PUBLICATIONS ", publications);

    });
};

function byId(req, res, next) {
    res.render('publication/byId', {
        id: req.params.id, showSideNav: true, user: req.user
    });
};

function newPublication(req, res, next) {
    res.render('publication/new', {showSideNav: true, contenido: req.params.content, user: req.user});
};

function myPublications(req, res, next) {
    res.render('publications/myPublications', {showSideNav: true, title: 'myPublications', user: req.user});
};
//Publicaciones controllers
function test(req, res, next){
  console.log("SI ENTRO ALV TITULO ALV",req.body.publication);
  /*let array = [];
  console.log("AQUI", req.files);

   //Ciclo para guardar todas las imagenes que se envian en el form
   for(let i = 0; i < req.files.length;i++){
     console.log(i);
     let image = new Image({
        file_id: "1",
        img: {
          data: fs.readFileSync(req.files[i].path),
          contentType: req.files.mimetype
        }
      });
      array.push(image._id);
      image.save();
   }
   // Id del usuario/autor
   console.log(array);
  let userPost;
   User.find({}, (err, result) => {
     userPost = result[0]._id;
   });
   // Se recuperan los id de las imagenes subidas

 //Publicacion
   let post = new Publication({
     title: "Un titulo",
     imagePreview: array[0],
     imageBackground:  array[0],
     state: "Un Estado",
     date: Date.now(),
     content: "Un contenido",
     imageSlider:[array[0],array[0],array[0],array[0],array[0],array[0]],
     author: userPost
    });

    post.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
});*/
};
module.exports = {
    map,
    byState,
    byDate,
    lastPublications,
    getMyPublications,
    getAllPublications,
    byId,
    newPublication,
    myPublications,
    test
};
