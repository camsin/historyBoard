const express = require('express');
let Publication = require('../../models/publication.js').Publication;
let User = require('../../models/user.js').User;

function map(req, res, next) {
    res.render('publications/map', {showSideNav: true, user: req.user});
};

function byState(req, res, next) {
    res.render('publications/byState', {
        estado: req.params.state, showSideNav: true, user: req.user
    });
};

function byDate(req, res, next) {
    res.render('publications/byDate', {showSideNav: true, user: req.user});

};

function lastPublications(req, res, next) {
    res.render('publications/lastPublications', {showSideNav: true, user: req.user});
};

function getMyPublications(req, res, next) {
    console.log("SI ENTRE A ESTO", req.user);
    Publication.find({"author": req.user._id}).populate('author').exec(function (err, publications) {
        if (err) {
            return res.json(err);
        }
        // if (publications.length != 0) {
        console.log("PUBLICATIONS ", publications);
        //     console.log("NO ES CERO");
            return res.json(publications);
        // } else {
        //     console.log("ES CERO ALB");
        //     return res.json("{}");
        // }

    });
};

function getAllPublications(req, res, next) {
    console.log("SI ENTRE A ESTO", req.user);
    Publication.find({}).populate('author').exec(function (err, publications) {
        if (err) {
            return res.json(err);
        }
        // if (publications.length != 0) {
        console.log("PUBLICATIONS ", publications);
        //     console.log("NO ES CERO");
            return res.json(publications);
        // } else {
        //     console.log("ES CERO ALB");
        //     return res.json("{}");
        // }

    });
};

function byId(req, res, next) {
    res.render('publication/byId', {
        id: req.params.id, showSideNav: true, user: req.user
    });
};

function newPublication(req, res, next) {
    res.render('publication/new', {showSideNav: true, contenido: req.params.content, user: req.user});
};

function myPublications(req, res, next) {
    res.render('publications/myPublications', {showSideNav: true, title: 'myPublications', user: req.user});
};

module.exports = {
    map,
    byState,
    byDate,
    lastPublications,
    getMyPublications,
    getAllPublications,
    byId,
    newPublication,
    myPublications
};
