var config = require('../config');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.redirect('login');
  });
  app.get('/login', function(req, res) {
    //Render login page and pass in any flash data if it exists
    res.render('login', { message: req.flash('loginMessage') }); 
  });
  //process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/vendor',
    failureRedirect : '/login',
    failureFlash : true //allow flash messages
  }));
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
  });
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/vendor',
    failureRedirect : '/signup',
    failureFlash : true // allow flash messages
  }));
  app.get('/home', isLoggedIn, function(req, res) {
    res.render('vendor', {
      user : req.user //pass User instance to view
    });
  });
  app.get('/vendor', isLoggedIn, function(req, res) {
    res.render('vendors', {
      user : req.user
    });
  });
  app.get('/newvendor', isLoggedIn, function(req, res) {
    res.render('newVendor', {
      user : req.user
    });
  });
  app.get('/update', isLoggedIn, function(req, res) {
    res.render('update', {
      user : req.user,
      vendor: config.currentUser
    });
  });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
};
//Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  //If user is authenticated, will continue to route
  if (req.isAuthenticated())
    return next();
  //If they are not, they will redirect to login
  res.redirect('/login');
}