var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var roles = require('../constants/roles.json');
var _ = require('underscore');

/* GET tour page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render('tour/checkIn');
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* GET students. */
router.get('/students', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.tourCtrl.getAllStudents(function(students) {
      res.json(students);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


/* GET students. */
router.get('/get-student-countries', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.tourCtrl.getStudentCountries(function(countries) {
      res.json(countries);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* GET tour page. */
router.post('/check-in', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.tourCtrl.checkInStudent(req.body, function(student) {
      res.json(student);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

module.exports = router;
