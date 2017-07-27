var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.personCtrl.getPersonByRole("host", function(hosts) {
      res.render('hostList', {
        "hosts": hosts
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


module.exports = router;
