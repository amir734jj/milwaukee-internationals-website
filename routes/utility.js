var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('utility/email');
});

router.post('/email', function(req, res, next) {
  authentication(req, function loggedIn() {
    global.sendMailUtility(["hesamian@uwm.edu", "asherimtiaz@gmail.com"], req.body);
    res.redirect("/utility");
  }, function loggedOut() {
    res.redirect("/");
  });

});

module.exports = router;
