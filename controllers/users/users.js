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
    User.update({"_id": req.user._id},
        {$set:{"name":req.body.name, "password": bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)}}, function (err) {
            if (err) {
                res.json({error:true, message: err});
            } else {
                res.json({error:false, message: "Se guardo exitosamente"});
            }
        });
};

module.exports = {
    myProfile,
    getMyProfile,
    updateMyProfile
};
