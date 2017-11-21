const express = require('express');
let User = require('../../models/user.js').User;
var bcrypt = require('bcrypt-nodejs');


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
    console.log("SI ENTRE AL METODO");
    console.log("CAA");
    console.log("User.generateHash(req.body.password)");
    User.update({"_id": req.user._id},
        {$set:{"name":req.body.name, "password": bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)}}, function (err) {
            if (err) {
                console.log("ERROR ALV");
                res.json({error:true, message: err});
                // response.redirect("/home");
            } else {
                console.log("SALIO BIEN :3 ")
                res.json({error:false, message: "Se guardo exitosamente"});
                // response.redirect("/detalleProyecto");
            }
        });
};

module.exports = {
    myProfile,
    getMyProfile,
    updateMyProfile
};
