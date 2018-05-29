const express = require('express');
const router = express.Router();
const passport = require('./../auth/passport.js').passport;
const User = require('../models/user.js').User;
const Image = require('./../models/image.js');
const fs = require('fs');
var amqp = require('amqplib/callback_api');


module.exports = function(io) {

    // const chat = io.of('/chat');

    router.get('/', (req, res, next) => {
    if(req.user){

        res.render('publications/lastPublications', {showSideNav: true, user: req.user});
    }else{
        res.render('login', {showSideNav: false, error: req.flash('error')});
    }
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.post('/login/android',passport.authenticate('local-login'), (req,res)=>{
    if (req.user) {
        console.log(req.user);
        return res.send(200, req.user);
        // return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/publications/lastPublications',
        failureRedirect: '/',
        failureFlash : true // allow flash messages
    }));

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/publications/lastPublications',
        failureRedirect: '/',
        failureFlash : true // allow flash messages
    }));

router.post('/registrar', function (req, res) {
    let body = req.body;
    let img = new Image({
      img:{
        data: fs.readFileSync('public/images/default.png'),
        contentType: 'image/png'
      }
    });
    img.save();
    let user = new User({
        name: body.name,
        email: body.email,
        profilePicture: img._id
    });

    if(user.verifyEmail()){
        user.duplicatedEmail((duplicate) => {
            if(duplicate){
                res.render('login', {object: user, error: "Email already in use"});
            } else {
                if(body.password === body.confirmPassword){
                    user.generateHash(body.password);
                    user.save((err) => {
                        if(err) {
                            res.render('login', {object: user, error: "Please complete all the fields"});
                        }else{
                            res.redirect("/");
                        }
                    });
                }else{
                    res.render('login', {object: user, error: "Passwords are not equals."});
                }

            }
        });
    }else{
        res.render('login', {object: user, error: "Email is not valid."});
    }
});

    return router;
};


// module.exports = router;
