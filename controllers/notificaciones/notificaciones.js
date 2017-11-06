const express = require('express')

function index(req, res, next){
  res.render('notificaciones',{});
}

module.exports = {
  index
}
