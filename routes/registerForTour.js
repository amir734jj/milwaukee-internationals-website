var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var countries = require('../modules/countries');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('tourRegister', {
    listOfCountries: countries
  });
});

router.post('/', function(req, res, next) {
  router.studentCtrl.addStudent(req.body, function successCallback(student) {
    res.redirect("/");
  });
});

router.get('/list', function(req, res, next) {
  authentication(req, function isLoggedIn() {
    router.studentCtrl.getAllStudents(function successCallback(students) {
      res.render("studentList", {
        "students": students
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


module.exports = router;
