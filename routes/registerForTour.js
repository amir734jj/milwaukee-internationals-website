var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('tourRegister');
});

//
// router.post('/', function(req, res, next) {
//   authentication(req, null, function loggedOut() {
//     router.userCtrl.containsUser(req.body, function successCallback(user) {
//       req.session.user = user;
//       res.redirect("/");
//     }, function failCallback() {
//       res.render('login', {
//         note: "Invalid username or password! please try again"
//       });
//     });
//   });
// });

module.exports = router;
