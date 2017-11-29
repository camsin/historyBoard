const express = require('express');
const Publication = require('../../models/publication').Publication;
const User = require('../../models/user').User;
const Comment = require('../../models/comment');
const Image = require('../../models/image');
const fs = require('fs');
const enumEstados = require('../../models/publication').enumEstados;

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
    //res.render('publications/lastPublications', {showSideNav: true, user: req.user});
      // if(req.user.profilePicture === undefined){
      //   User.update({"_id": req.user._id},{$set:{"profilePicture": img}},{multi:true},
      //   function(err, numberAffected){
      //   });
      // }
      res.render('publications/lastPublications', {showSideNav: true, user: req.user});

};

function getMyPublications(req, res, next) {
    Publication.find({"author": req.user._id}).populate('author').exec((err, publication) => {
        if (err) {
            return res.json(err);
        }
        console.log(publication);
        return res.json(publication);
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
    res.render('publication/byId', {id: req.params.id,showSideNav: true, user: req.user,});

};

function getData(req, res, next) {
  Publication.findOne({"_id": req.params.id}).populate('author').exec((err, publication) => {
      if (err) {
          return res.json(err);
      }
      console.log(publication);
      return res.json(publication);
  });
 //  Publication.findOne({_id : req.params.id}, function(err,publication){
 //    User.findOne({_id : publication[0].author}, function(err,userData){
 //      console.log(userData);
 //      res.render('publication/byId', {
 //          id: req.params.id, showSideNav: true, user: req.user, publication: publication, userData: userData
 //      });
 //
 //   });
 // });

};

function newPublication(req, res, next) {
    res.render('publication/new', {showSideNav: true, contenido: req.params.content, user: req.user, enumEstados: enumEstados});
};

function myPublications(req, res, next) {
    res.render('publications/myPublications', {showSideNav: true, title: 'myPublications', user: req.user});
};

function uploadPublication(req, res, next){
  let array = [];
  let values = Object.values(req.body);
  let notError = true;
  for (var i = 0; i < values.length; i++) {
    if (values[i] == 'undefined') {
      notError = false;
    }
  }
  if(notError && req.files.length == 7){
    let nameFiles = Object.keys(req.files);
    for(let i = 0; i < req.files.length;i++){
      let image = new Image({
         file_id: nameFiles[i],
         img: {
           data: fs.readFileSync(req.files[i].path),
           contentType: req.files[i].mimetype
         }
       });
       array.push(image._id);
       image.save();
    }

    //Publicacion
    let post = new Publication({
      title: req.body.title,
      imagePreview: array[0],
      imageBackground:  array[1],
      state: req.body.state,
      date: req.body.date,
      content: req.body.content,
      imageSlider:[array[2],array[3],array[4],array[5],array[6]],
      author: req.user._id,
      postDate: new Date()
      //author: userPost
     });

     post.save((err) => {
     if (err) {
       res.send(err);
     } else {
       res.sendStatus(200);
     }
    });

  }else{
    return res.status(400).send("Yolo");
  }

};

function getImages(req, res, next) {
  if(req.params.id != undefined){
    Image.find({_id : req.params.id}, function(err,imgSrc){
      if(imgSrc){
        //res.contentType(imgSrc.img.type);

          res.contentType(imgSrc[0].img.contentType);
          res.send(imgSrc[0].img.data);
         //return res.json(imgSrc);
      } else {
        console.log(err);
      }
   });
 }else{

 }
};

function newComment(req, res, next) {
  console.log(req.body);
    let comment = new Comment({
      publication: req.body.publication,
      date: req.body.date,
      content: req.body.content,
      author: req.user._id
   });
   comment.save((err, comment) => {
       if (err) {
         res.send(err);
       } else {
         res.send(comment);
       }
    });
};

function getComments(req, res, next) {
    Comment.find({"publication": req.params.id}).populate('author').populate('publication').exec(function(err, comments){
        if (err) {
            return res.json(err);
        }
        return res.json(comments);

    });
};

function getCommentsCount(req, res, next) {
    Comment.find({"publication": req.params.id}).count(function(err, count){
        if (err) {
            return res.json(err);
        }
        return res.json(count);
    });
};

function editPublication(req,res,next){
  console.log("PUBLICACION FIND");
  Publication.findOne({_id : req.params.id}).populate('imagePreview').populate( 'imageSlider').populate('imageBackground').exec(function(err,publication) {
    console.log("TODA LA PUBLICACION",publication);
    publication = JSON.stringify(publication);
    User.find({_id : publication.author}).exec(function(err,userData){
      res.render('publication/edit', {
          id: req.params.id, showSideNav: true, user: req.user, publication: publication, userData: userData, enumEstados: enumEstados
      });

   });
 });
}
function deletePublication(req,res,next) {
  let flag = 0;
  console.log(req.params.id);
  //Se eliminan comentarios
  Comment.remove({publication: req.params.id},(err, object)=>{
    if(err)
      console.log("ERROR COMMENTS");
    else
      console.log("SI SE BORRARON COMMENTS");
  });
  //Se llena arreglo con ids de imagenes para evitar conflictos
  let imagesDelete = [];
  Publication.findOne({_id: req.params.id},(err, publication)=>{
    if(err){
      console.log("ERROR ARREGLO");
    }else{
      imagesDelete.push(publication.imagePreview);
      imagesDelete.push(publication.imageBackground);
      for(let i=0;i<5;i++){
        imagesDelete.push(publication.imageSlider[i]);
      }
        Publication.remove({_id: req.params.id},(err, object)=>{
          if(err)
            console.log("ERROR PUBLICATION");
          else
            console.log("SI SE BORRO PUBLICATION");
        });
      //Se eliminan imagenes
      for(let i=0;i<7;i++){
        Image.remove({_id: imagesDelete[i]},(err, object)=>{
          if(err)
            console.log("ERROR IMAGES");
          else
            console.log("SI SE BORRARON IMAGES");
        });
      }
    }
  });

  res.redirect('/publications/myPublications');
  // Publication.remove({_id: req.params.id},(err, object)=>{
  //   if(err)
  //     res.redirect('/');
  //   else
  //     res.redirect('/');
  // });
}

function getPublicationsByState(req, res, next){
    Publication.find({"state": req.params.state}).populate('author').exec(function(err, publications){
        if(err){
            return res.json(err);
        }

        return res.json(publications);
    });
};

function userPublications(req, res, next){
    res.render('publications/userPublications', {showSideNav: true, user: req.user, idUsuario:req.params.id});

}

function getUserPublications(req, res, next){
    Publication.find({"author": req.params.id}).populate('author').exec((err, publications) => {
        if (err) {
            return res.json(err);
        }

        return res.json(publications);
    });
};

function saveEdit(req, res, next){
  console.log(req.body);
    let array = [];
    let oldImages = [];
    //Se guardan las nuevas imagenes
    if(req.files.length != undefined){
      let nameFiles = Object.keys(req.files);
      for(let i = 0; i < req.files.length; i++){
        let image = new Image({
           file_id: nameFiles[i],
           img: {
             data: fs.readFileSync(req.files[i].path),
             contentType: req.files[i].mimetype
           }
         });
         array.push([
                id=image._id,
                name=req.files[i].fieldname]);
         image.save(function (err) {
           if(err)
            console.log(err);
          else
            console.log("guardadoooo",array[i][1]);
         });

      }

    //Se hace comparativa
    Publication.findOne({"_id": req.params.id},function(err, publications){
          if(err){
              return res.json(err);
          }

            oldImages.push([publications.imagePreview,"preview"]);
            oldImages.push([publications.imageBackground,"head"]);
            oldImages.push([publications.imageSlider[0],"img1"]);
            oldImages.push([publications.imageSlider[1],"img2"]);
            oldImages.push([publications.imageSlider[2],"img3"]);
            oldImages.push([publications.imageSlider[3],"img4"]);
            oldImages.push([publications.imageSlider[4],"img5"]);
            if(array.length>0){
              for(let z=0;z<req.files.length;z++){
                for(let i=0;i<7;i++){
                  if(oldImages[i][1] == array[z][1]){
                    oldImages[i][0] = array[z][0];
                    Image.remove({_id: oldImages[i][0]});
                  }
                }
              }
            }

            Publication.update({"_id": req.params.id},
                              {$set:{
                                "title":req.body.title,
                                "state":req.body.state,
                                "date":req.body.date,
                                "content":req.body.content,
                                "imagePreview": oldImages[0][0],
                                "imageBackground": oldImages[1][0],
                                "imageSlider[0]": oldImages[2][0],
                                "imageSlider[2]": oldImages[3][0],
                                "imageSlider[3]": oldImages[4][0],
                                "imageSlider[4]": oldImages[5][0],
                                "imageSlider[5]": oldImages[6][0],
                                "postDate": new Date()}}, function (err) {
                                  if(err)
                                    console.log(err);
                                  else
                                    console.log("AHUEVO");
                                });

      });
    }else{
        Publication.update({"_id": req.params.id},
                          {$set:{
                            "title":req.body.title,
                            "state":req.body.state,
                            "date":req.body.date,
                            "content":req.body.content,
                            "postDate": new Date()}}, function (err) {
                              if(err)
                                console.log(err);
                              else

                                console.log("AHUEVO");
                            });
      }

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
    getComments,
    editPublication,
    deletePublication,
    getCommentsCount,
    getPublicationsByState,
    getData,
    userPublications,
    getUserPublications,
    saveEdit
};
