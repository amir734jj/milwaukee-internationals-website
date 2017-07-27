var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.userCtrl.getAllUsers((users) => {
      res.render('users', {
        'users': users
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.redirect("/");
  }, function loggedOut() {
    res.render('login');
  });
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  authentication(req, null, function loggedOut() {
    router.userCtrl.containsUser(req.body, function successCallback(user) {
      req.session.user = user;
      res.redirect("/");
    }, function failCallback() {
      res.render('login', {
        note: "Invalid username or password! please try again"
      });
    });
  });
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});


/* GET register page. */
router.get('/register', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.redirect("/");
  }, function loggedOut() {
    res.render('register');
  });
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.redirect("/");
  }, function loggedOut() {
    router.userCtrl.addUser(req.body, function successCallback(user) {
      res.redirect("/login");
    }, function failCallback() {
      res.render('register', {
        note: "Email is already taken, please try another email address!"
      });
    });
  });
});