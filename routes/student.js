var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var countries = require('../constants/countries.json');
var moment = require('moment');

/* GET login page. */
router.get('/register', function(req, res, next) {
  res.render('student/tourRegister', {
    listOfCountries: countries
  });
});


/* POST student page. */
router.post('/register', function(req, res, next) {
  router.studentCtrl.addStudent(req.body, function successCallback(student) {
    global.mailService(req.body.email, req.body);
    res.redirect("/student/confirmation");
  });
});

/* GET student list page. */
router.get('/list', function(req, res, next) {
  authentication(req, function isLoggedIn() {
    router.studentCtrl.getAllStudents(function successCallback(students) {
      res.render("student/studentList", {
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

/* GET student list page json. */
router.get('/list/json', function(req, res, next) {
  authentication(req, function isLoggedIn() {
    router.studentCtrl.getAllStudents(function successCallback(students) {
      res.json(students);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* GET deletes student. */
router.get('/delete/:studentId', function(req, res, next) {
  authentication(req, function isLoggedIn() {
    router.studentCtrl.deleteStudent(req.params, function(student) {
      res.redirect("/student/list");
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* GET login page. */
router.get('/confirmation', function(req, res, next) {
  res.render('student/registrationConfirmation');
});

module.exports = router;
