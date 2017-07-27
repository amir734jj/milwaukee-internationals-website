var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var roles = require('../constants/roles.json');

/* GET login page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render('personRegister', {
      listOfRoles: roles
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


router.post('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.personCtrl.addPerson(req.body, function() {
      res.redirect("/");
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


module.exports = router;
