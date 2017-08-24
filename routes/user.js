var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.userCtrl.getAllUsers((users) => {
      res.render('user/userList', {
        'users': users
      });
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.redirect("/");
  }, function loggedOut() {
    res.render('user/login');
  });
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  authentication(req, null, function loggedOut() {
    router.userCtrl.containsUser(req.body, function successCallback(user) {
      req.session.user = user;
      res.redirect("/");
    }, function failCallback() {
      res.render('user/login', {
        note: "Invalid username or password! please try again"
      });
    });
  });
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});


/* GET register page. */
router.get('/register', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.redirect("/");
  }, function loggedOut() {
    res.render('user/register');
  });
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.redirect("/");
  }, function loggedOut() {
    router.userCtrl.addUser(req.body, function successCallback(user) {
      res.redirect("/user/login");
    }, function failCallback() {
      res.render('user/register', {
        note: "Email is already taken, please try another email address!"
      });
    });
  });
});



router.get('/delete/:id', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.userCtrl.deleteUser({
      userId: req.params.id
    }, function() {
      if (req.session.user.userId === req.params.userId) {
        res.redirect("/user/logout");
      } else {
        res.redirect("/user");
      }
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});

module.exports = router;
