var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET student driver mapping page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render("mapping/driverMapping");
  }, function loggedOut() {
    res.redirect("/");
  });
});

router.post('/:action', function(req, res, next) {
  authentication(req, function loggedIn() {
    var method;
    if (req.params.action === "delete") {
      method = "deleteMap";
    } else if (req.params.action === "add") {
      method = "addMap";
    } else {
      return;
    }

    router.driverMappingCtrl[method](req.body, function() {
      res.send(`${method} action is complete`);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

router.get('/list/json', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.driverMappingCtrl.getAllMappings(function(list) {
      res.json(list);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});







// router.get('/student/host', function(req, res, next) {
//   authentication(req, function loggedIn() {
//     res.render("mapping/hostMapping");
//   }, function loggedOut() {
//     res.redirect("/");
//   });
// });



module.exports = router;
