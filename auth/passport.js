const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;
let configAuth = require('./../config/auth');
let User = require('./../models/user.js').User;

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        console.log("ALVVVVVVV");
        // find a user whose email is the same as the forms email
        // // we are checking to see if the user trying to login already exists
        // User.findOne({ 'email' :  email }, function(err, user) {
        //     console.log("ALVVVVVVV");
        //     // if there are any errors, return the error before anything else
        //     if (err)
        //         return done(err);
        //
        //     // if no user is found, return the message
        //     if (!user)
        //         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        //
        //     // if the user is found but the password is wrong
        //     if (!user.validPassword(password))
        //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        //
        //     // all is well, return successful user
        //     return done(null, user);
        // });

    }));

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
            if (!user.validatePassword(password)) {
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
                            console.log("ERR", err);
                            res.render('login', {errorMessage: "Ocurrio un error en el found"});
                        }
                        if(userEmail){
                            userEmail.socialNetworks.google = profile._json;
                            userEmail.save(function (err) {
                                return done(err, userEmail);
                            });
                        }else{
                            user = new User({
                                name: profile.name.givenName,
                                lastName: profile.name.familyName,
                                email: profile.emails[0].value,
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
            console.log("ERR", err);
            console.log("USER", user);
            if(err) {
                return done(err, null);
            } else {
                if(user){
                    return done(err, user);
                } else {
                    User.findOne({"email": profile.emails[0].value}, function (err, userEmail) {
                        if(err){
                            console.log("ERR", err);
                            res.render('login', {errorMessage: "Ocurrio un error en el found"});
                        }
                        if(userEmail){
                            userEmail.socialNetworks.facebook = profile._json;
                            userEmail.save(function (err) {
                                return done(err, userEmail);
                            });
                        }else{
                            user = new User({
                                name: profile.name.givenName,
                                lastName: profile.name.familyName,
                                email: profile.emails[0].value,
                                provider:'facebook',
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
 * Función utilizada para serializar el usuario dentor de la sesión.
 */
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

/**
 * Función utilizada para desserializar el usuario dentor de la sesión para su utilización..
 */
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

/**
 * Revisa si existe un usuario logueado a la aplicación, en caso de no existir redireciona al inicio de sesión.
 */
function isLoggedIn(req, res, next) {
    if (req.user){
        return next();
    } else {
        res.redirect('/login');
    }
};



module.exports = {
    passport,
    isLoggedIn
};