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

module.exports = router;
