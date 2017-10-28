const express = require('express')

function index(req, res, next){
  res.render('ultimasPublicaciones',{});
}

module.exports = {
  index
}
