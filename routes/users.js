var express = require('express');
var router = express.Router();
var authentication = require('../modules/authentication');

/* GET users listing. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.userCtrl.getAllUsers((user) => {
      res.render('users', {
        'users': users
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

module.exports = router;
