const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./../config/auth');
const User = require('./../models/user.js').User;
const Image = require('./../models/image.js');
const fs = require('fs');

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validatePass(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

//
passport.use('google', new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ "socialNetworks.google.id": profile.id, provider:"google"}, function (err, user) {
            if(err) {
                return done(err, null);
            } else {
                if(user){
                    return done(null, user);
                } else {
                    User.findOne({"email": profile.emails[0].value}, function (err, userEmail) {
                        if(err){
                            res.render('login', {message: "Ocurrio un error en el found"});
                        }
                        if(userEmail){
                            userEmail.socialNetworks.google = profile._json;
                            userEmail.save(function (err) {
                                return done(err, userEmail);
                            });
                        }else{
                            let img = new Image({
                              img:{
                                data: fs.readFileSync('public/images/default.png'),
                                contentType: 'image/png'
                              }
                            });
                            img.save();
                            user = new User({
                                name: profile.name.givenName + ' ' + profile.name.familyName,
                                email: profile.emails[0].value,
                                profilePicture: img._id,
                                provider:'google',
                                socialNetworks: {
                                    google:profile._json
                                }
                            });
                            user.save(function (err) {
                                return done(err, user);
                            });
                        }
                    });
                }
            }
        });
    }
));

passport.use('facebook', new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: [
            'displayName',
            'emails',
            'first_name',
            'last_name'
        ]
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ "socialNetworks.facebook.id": profile.id, provider:"facebook"}, function (err, user) {
            if(err) {
                return done(err, null);
            } else {
                if(user){
                    return done(err, user);
                } else {
                    User.findOne({"email": profile.emails[0].value}, function (err, userEmail) {
                        if(err){
                            res.render('login', {message: "Ocurrio un error en el found"});
                        }
                        if(userEmail){
                            userEmail.socialNetworks.facebook = profile._json;
                            userEmail.save(function (err) {
                                return done(err, userEmail);
                            });
                        }else{
                            let img = new Image({
                              img:{
                                data: fs.readFileSync('public/images/default.png'),
                                contentType: 'image/png'
                              }
                            });
                            img.save();
                            user = new User({
                                name: profile.name.givenName + ' ' + profile.name.familyName,
                                email: profile.emails[0].value,
                                provider:'facebook',
                                profilePicture: img._id,
                                socialNetworks: {
                                    facebook:profile._json
                                }
                            });
                            user.save(function (err) {
                                return done(err, user);
                            });
                        }
                    });

                }
            }
        });
    }
));


/**
 * Función utilizada para serializar el user dentor de la sesión.
 */
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

/**
 * Función utilizada para desserializar el user dentor de la sesión para su utilización..
 */
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

/**
 * Revisa si existe un user logueado a la aplicación, en caso de no existir redireciona al inicio de sesión.
 */
function isLoggedIn(req, res, next) {
    if (req.user.authenticated){
        return next();
    } else {
        res.redirect('/');
    }
};



module.exports = {
    passport,
    isLoggedIn
};
