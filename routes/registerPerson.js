var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('personRegister', {
    listOfRoles: ["Driver", "Host", "Navigator", "Volunteer"]
  });
});


router.post('/', function(req, res, next) {
  router.studentCtrl.addStudent(req.body, function successCallback(student) {
    res.redirect("/");
  });
});

// TODO:
router.get('/list', function(req, res, next) {
  authentication(req, function() {
    router.studentCtrl.getAllStudents(function successCallback(students) {
      res.render("studentList", {
        "students": students
      });
    });
  });
});


module.exports = router;
