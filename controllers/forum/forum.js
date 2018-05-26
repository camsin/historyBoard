const express = require('express');


function index(req, res, next) {
    res.render('forum', {showSideNav: true, user: req.user});
}

// function postMessage(req, res, next){
//     console.log("REQ", req.body);
//     var message =  {text: req.body.newMessage, date: new Date()};
//     publish("", "jobs", new Buffer(JSON.stringify(message)));
// }


module.exports = {
    index
};