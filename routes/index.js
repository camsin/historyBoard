const express = require('express');
const router = express.Router();
const passport = require('./../auth/passport.js').passport;
const User = require('../models/user.js').User;

router.get('/', (req, res, next) => {
    res.render('login', {showSideNav: false});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/publications/lastPublications', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


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
        failureRedirect: '/'
    }));

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/publications/lastPublications',
        failureRedirect: '/'
    }));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/publications/lastPublications',
        failureRedirect: '/'
    }));


router.post('/registrar', function (req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email
    });

    if(user.verifyEmail()){
        user.duplicatedEmail((duplicate) => {
            if(duplicate){
                res.render('login', {object: user, errorMessage: "Email already in use"});
            } else {
                if(body.password === body.confirmPassword){
                    user.generateHash(body.password);
                    user.save((err) => {
                        if(err) {
                            res.render('login', {object: user, errorMessage: "Please complete all the fields"});
                        }else{
                            res.redirect("/publications/lastPublications");
                        }
                            //         let emailUtilities = new EmailUtilities(user.email, "Welcome email");
                            // emailUtilities.sendWelcomeEmail(user.id);

                    });
                }else{
                    res.render('login', {object: user, errorMessage: "Passwords are not equals."});
                }

            }
        });
    }else{
        res.render('login', {object: user, errorMessage: "Email is not valid."});
    }
});


module.exports = router;
