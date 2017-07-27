var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.personCtrl.getPersonByRole("Driver", function(drivers) {
      res.render('driverList', {
        "drivers": drivers
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


module.exports = router;
