const express = require('express')

function index(req, res, next){
  res.render('notificaciones',{showSideNav: true});
}

module.exports = {
  index
}
