const express = require('express')

function index(req, res, next){
  res.render('notifications',{showSideNav: true});
}

module.exports = {
  index
}
