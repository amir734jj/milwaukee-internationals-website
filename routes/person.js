var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var roles = require('../constants/roles.json');
var _ = require('underscore');

/* GET person page. */
router.get('/register', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render('person/personRegister', {
      listOfRoles: roles
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* POST person page. */
router.post('/register', function(req, res, next) {
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
    var roleObject = _.findWhere(roles, {
      key: req.params.role
    });

    if (roleObject) {
      router.personCtrl.getPersonByRole(roleObject.key, function(persons) {
        var key = `${roleObject.key}s`;
        var retVal = {};
        retVal[key] = persons;
        res.render(`person/${roleObject.key}List`, retVal);
      });
    }
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

module.exports = router;
