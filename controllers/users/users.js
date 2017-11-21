const express = require('express');
let User = require('../../models/user.js').User;


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

module.exports = {
    myProfile,
    getMyProfile
};
