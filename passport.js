// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var counsel = require( './counsel' );

// load up the user model
var User            = counsel.User;

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then( function( user ) {
            done(null, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({ where: {username: username} })
                .then( function(user) {
                    if(user) {
                        return done(null, false, req.flash('signupMessage',
                         'That username is already taken.'));
                    } else {
                        User.create({ 
                            name: req.body.name,
                            password: User.generateHash(password),
                            typeOfUser: req.body.typeOfUser,
                            username: username
                        }).then( function(user) {
                            done(null, user);
                        });
                    }
                });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) {
        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        User.findOne({ where: {username: username} })
            .then( function( user ) {
                // if no user is found, return the message
                if (!user){
                    return done(null, false, req.flash('loginMessage',
                     'No user found.'));
                }
                // if the user is found but the password is wrong
                if (!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage',
                     'Oops! Wrong password.'));
                }
                // all is well, return successful user
                return done(null, user);
            });
    }));
};
