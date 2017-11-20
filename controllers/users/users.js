const express = require('express');

function myProfile(req, res, next){
  res.render('myProfile', { showSideNav: true, title: 'myProfile', usuario:req.user });
}

module.exports = {
    myProfile
};
