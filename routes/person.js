var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var roles = require('../constants/roles.json');
var _ = require('underscore');

/* GET person page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render('personRegister', {
      listOfRoles: roles
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* POST person page. */
router.post('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.personCtrl.addPerson(req.body, function() {
      res.redirect("/");
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


/* GET login page. */
router.get('/list/:role', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.personCtrl.getPersonByRole(req.params.role, function(drivers) {
      res.render('driverList', {
        "drivers": drivers
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

router.get('/list/:role/json', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.personCtrl.getPersonByRole(req.params.role, function(drivers) {
      res.json(drivers);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});
