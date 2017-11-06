const express = require('express')

function miPerfil(req, res, next){
  res.render('miPerfil', { showSideNav: true, title: 'miPerfil' });
}

module.exports = {
    miPerfil
}
