var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var countries = require('../modules/countries');
var moment = require('moment');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('tourRegister', {
    listOfCountries: countries
  });
});

router.get('/confirmation', function(req, res, next) {
  res.render('registrationConfirmation');
});

router.post('/', function(req, res, next) {
  router.studentCtrl.addStudent(req.body, function successCallback(student) {
    global.mailService(req.body.email, req.body);
    res.redirect(req.originalUrl + "/confirmation");
  });
});

router.get('/list', function(req, res, next) {
  authentication(req, function isLoggedIn() {
    router.studentCtrl.getAllStudents(function successCallback(students) {
      res.render("studentList", {
        "students": students.map(student => {
          student.interests = JSON.parse(student.interests);
          student.date = moment(new Date(student.date)).format('MM-DD-YYYY, h:mm:ss a');
          return student;
        })
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


module.exports = router;
