const express = require('express')

function index(req, res, next){
  res.send("Hola soy las ultimas publicaciones");
}

module.exports = {
  index
}
