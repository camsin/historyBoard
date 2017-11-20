const express = require('express')

function map(req, res, next){
    res.render('publications/map', {showSideNav: true, usuario:req.user});
};

    function byState(req, res, next){
    res.render('publications/byState', {
        estado:req.params.state, showSideNav: true, usuario:req.user});
};

function byDate(req, res, next){
    res.render('publications/byDate', { showSideNav: true, usuario:req.user});

};

function lastPublications(req, res, next){
    res.render('publications/lastPublications',{showSideNav: true, usuario:req.user});

};

function byId(req, res, next){
    res.render('publication/byId', {
        id: req.params.id, showSideNav: true, usuario:req.user});
};

function newPublication(req, res, next){
    res.render('publication/new', {showSideNav: true, contenido: req.params.content, usuario:req.user});
};

function myPublications(req, res, next){
    res.render('publications/myPublications', { showSideNav: true, title: 'myPublications', usuario:req.user });
};

module.exports = {
  map,
  byState,
  byDate,
  lastPublications,
  byId,
  newPublication,
  myPublications
};
