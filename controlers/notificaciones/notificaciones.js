const express = require('express')

function index(req, res, next){
  res.render('notificaciones', {title:"Mi perfil"});
}

module.exports = {
  index
}
