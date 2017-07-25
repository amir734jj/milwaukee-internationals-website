var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.redirect("/");
  }, function loggedOut() {
    res.render('register');
  });
});

router.post('/', function(req, res, next) {
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

module.exports = router;
