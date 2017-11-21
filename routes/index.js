var express = require('express');
var router = express.Router();
let passport = require('./../auth/passport.js').passport;
let User = require('../models/user.js').User;

router.get('/', function (req, res, next) {
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

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/publications/lastPublications',
        failureRedirect: '/'
    }));

router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/publications/lastPublications',
        failureRedirect: '/'
    }));


router.post('/registrar', function (req, res) {
    let body = req.body;
    console.log("BOSY!!!!!!", body);
    let user = new User({
        name: body.name,
        email: body.email
    });

    console.log("USER ASDFSD", user);

    // user.verifyPassword(body.confirmPassword);
    // if (user.confrimPassword(body.password)) {
    user.isDuplicateEmail((duplicate) => {
        if(duplicate){
            console.log("EMAIL YA");
            res.render('login', {object: user, errorMessage: "Email already in use"});
        } else {
            if(body.password === body.confirmPassword){
                // console.log("USER", user);
                user.generateHash(body.password);
                user.save((err) => {
                    if(err) {
                        console.log("ABL ERROR", err);
                        res.render('login', {object: user, errorMessage: "Please complete all the fields"});
                    }else{
                        res.redirect("/publications/lastPublications");
                    }
                        //         let emailUtilities = new EmailUtilities(user.email, "Welcome email");
                        // emailUtilities.sendWelcomeEmail(user.id);

                });
            }else{
                console.log("ERROR PASS");
                res.render('login', {object: user, errorMessage: "Passwords are not equals."});
            }

        }
    });
});


module.exports = router;
