const express = require('express')

function index(req, res, next){
  res.render('notifications',{showSideNav: true, usuario:req.user});
}

module.exports = {
  index
}
