const express = require('express');
let User = require('../../models/user.js').User;
const Image = require('../../models/image.js');
var bcrypt = require('bcrypt-nodejs');
const fs = require('fs');


function myProfile(req, res, next){
  res.render('myProfile', { showSideNav: true, title: 'myProfile', user:req.user });
}

function getMyProfile(req, res, next){
    User.findOne({"_id": req.user._id}).exec(function(err, user){
        if(err){
            res.json(err);
        }

        res.json(user);
    });
};

function updateMyProfile(req, res, next) {
    User.update({"_id": req.user._id},
        {$set:{"name":req.body.name, "password": bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)}}, function (err) {
            if (err) {
                res.json({error:true, message: err});
            } else {
                console.log("SALIO BIEN :3 ")
                if(req.files.length > 0){
                  let imgId = 0;
                  let image = new Image({
                     file_id: "",
                     img: {
                       data: fs.readFileSync(req.files[0].path),
                       contentType: req.files[0].mimetype
                     }
                   });
                   imgId = image._id;
                   image.save();
                   User.update({"_id": req.user._id},{$set:{"profilePicture": imgId}},{multi:true},
                   function(err, numberAffected){
                   });



                }else{
                      res.json({error:false, message: "Se guardo exitosamente"});
                }

                // response.redirect("/detalleProyecto");
            }
        });

};

module.exports = {
    myProfile,
    getMyProfile,
    updateMyProfile
};
