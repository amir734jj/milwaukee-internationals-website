var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var _ = require('underscore');

/* GET home page. */
router.get('/email', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render('utility/email');
  }, function loggedOut() {
    res.redirect("/");
  });
});

router.post('/email', function(req, res, next) {
  authentication(req, function loggedIn() {
    var emailList = [];

    router.utilityCtrl.getAll((retVal) => {
        if (req.body.hosts) {
          emailList = emailList.concat(_.pluck(retVal.hosts, "email"));
        }

        if (req.body.drivers) {
          emailList = emailList.concat(_.pluck(retVal.drivers, "email"));
        }

        if (req.body.users) {
          emailList = emailList.concat(_.pluck(retVal.users, "email"));
        }

        if (req.body.students) {
          emailList = emailList.concat(_.pluck(retVal.students, "email"));
        }

        global.sendMailUtility(emailList, req.body);

        res.redirect("/utility");
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


router.get('/email/json', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.utilityCtrl.getAll((retVal) => {
      res.json(retVal);
    });
  }, function loggedOut() {
    res.redirect("/");
  });

});

module.exports = router;
