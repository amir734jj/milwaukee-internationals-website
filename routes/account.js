var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res, next) {
  router.userCtrl.getAllUsers(req.body, function successCallback(users) {
    res.render("userList", {
      "users": users
    })
  });
});

module.exports = router;
