const express = require('express');
const Publication = require('../../models/publication.js').Publication;
const User = require('../../models/user.js').User;
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
    Publication.find({"author": req.user._id}).populate('author').exec((err, publications) => {
        if (err) {
            return res.json(err);
        }
        return res.json(publications);
    });
};

function getAllPublications(req, res, next) {
    Publication.find({}).populate('author').exec((err, publications) => {
        if (err) {
            return res.json(err);
        }

        return res.json(publications);
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

function uploadPublication(req, res, next){
  let array = [];
   for(let i = 0; i < req.files.length;i++){
     let image = new Image({
        file_id: "1",
        img: {
          data: fs.readFileSync(req.files[i].path),
          contentType: req.files[i].mimetype
        }
      });
      array.push(image._id);
      image.save();
   }
  let userPost;
   User.find({}, (err, result) => {
     userPost = result[0]._id;
   });

   let post = new Publication({
     title: req.body.title,
     imagePreview: array[0],
     imageBackground:  array[1],
     state: req.body.state,
     date: req.body.date,
     content: req.body.content,
     imageSlider:[array[2],array[3],array[4],array[5],array[6]],
     author: userPost
    });

    post.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.sendStatus(200);
        }
    });
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
    uploadPublication
};
