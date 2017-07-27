var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render('personRegister', {
      listOfRoles: ["Driver", "Host", "Navigator", "Volunteer"]
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


router.post('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.personCtrl.addPerson(req.body, function() {
      res.redirect("/");
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});


//
// // TODO:
// router.get('/list', function(req, res, next) {
//   authentication(req, function() {
//     router.studentCtrl.getAllStudents(function successCallback(students) {
//       res.render("studentList", {
//         "students": students
//       });
//     });
//   });
// });


module.exports = router;
