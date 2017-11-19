const express = require('express');

function myProfile(req, res, next){
  res.render('myProfile', { showSideNav: true, title: 'myProfile' });
}

module.exports = {
    myProfile
};
