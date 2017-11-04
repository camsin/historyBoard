const express = require('express')

function index(req, res, next){
  res.render('miPerfil',{});
}

module.exports = {
  index
}
