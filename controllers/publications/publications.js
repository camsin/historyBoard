const express = require('express')

function map(req, res, next){
    res.render('publications/map', {showSideNav: true});
};

    function byState(req, res, next){
    res.render('publications/byState', {
        estado:req.params.state, showSideNav: true});
};

function byDate(req, res, next){
    res.render('publications/byDate', { showSideNav: true});

};

function lastPublications(req, res, next){
    res.render('publications/lastPublications',{showSideNav: true});

};

function byId(req, res, next){
    res.render('publication/byId', {
        id: req.params.id, showSideNav: true});
};

function newPublication(req, res, next){
    res.render('publication/new', {showSideNav: true,
        contenido: req.params.content});
};

function myPublications(req, res, next){
    res.render('publications/myPublications', { showSideNav: true, title: 'myPublications' });
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
