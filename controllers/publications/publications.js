const express = require('express');
const Publication = require('../../models/publication.js').Publication;
const User = require('../../models/user.js').User;
const Comment = require('../../models/comment.js');
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
  Publication.find({_id : req.params.id}, function(err,publication){
    console.log(publication[0].imageSlider[0]);
    User.find({_id : publication[0].author}, function(err,userData){
      res.render('publication/byId', {
          id: req.params.id, showSideNav: true, user: req.user, publication: publication, userData: userData
      });

   });
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
     author: req.user._id
     //author: userPost
    });

    post.save((err) => {
    if (err) {
      res.send(err);
    } else {
      console.log(post);res.sendStatus(200);
    }
});
};

function getImages(req, res, next) {

       Image.find({_id : req.params.id}, function(err,imgSrc){

         console.log("imgSrc ", imgSrc);
         //res.contentType(imgSrc.img.type);
          res.contentType(imgSrc[0].img.contentType);
          res.send(imgSrc[0].img.data);
         //return res.json(imgSrc);

      });

};

function newComment(req, res, next) {
    console.log("request",req.body);
    let commment = new Comments({
      publication: req.body.publication,
      date: req.body.date,
      content: req.body.content,
      author: req.user._id
   });
   commment.save((err) => {
       if (err) {
         res.send(err);
       } else {
         res.sendStatus(200);
       }
    });
};

function getComments(req, res, next) {
  // let array = [];
  //   Publication.find({"author": req.user._id}).populate('author').exec(function (err, publications) {
  //       if (err) {
  //           return res.json(err);
  //       }
  //       // if (publications.length != 0) {
  //       //     console.log("NO ES CERO");
  //       console.log(publications);
  //       return res.json(publications);
  //       // } else {
  //       //     console.log("ES CERO ALB");
  //       //     return res.json("{}");
  //       // }
  //
  //   });

    Comment.find({"publication": req.params.id}).populate('author').exec(function(err, comments){
        if (err) {
            return res.json(err);
        }
        console.log(comments);
        return res.json(comments);

    });


  // Comments.find({publication : req.params.id}, function(err,comments){
  //   for(let i=0;i<comments.length;i++){
  //     User.find({_id : comments[i].author}, function(err,user){
  //       array.push({
  //         content: comments[i].content,
  //         name: user[0].name,
  //         userId: user[0]._id
  //       });
  //       if ((i+1)==comments.length) {
  //           console.log(array);
  //           //res.sendStatus(200);
  //           return res.json(array);
  //       }
  //    });
  //   }
  // });
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
    uploadPublication,
    getImages,
    newComment,
    getComments
};
