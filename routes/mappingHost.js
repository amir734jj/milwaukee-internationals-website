var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var _ = require('underscore');


/* GET student driver mapping page. */
router.get('/', function(req, res, next) {
  authentication(req, function loggedIn() {
    res.render("mapping/hostMapping");
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

    router.hostMappingCtrl[method](req.body, function() {
      res.send(`${method} action is complete`);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});



router.get('/list/json', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.hostMappingCtrl.getAllMappings(function(list) {
      res.json(list);
    });
  }, function loggedOut() {
    res.redirect("/");
  });
});



router.get('/mail', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.hostMappingCtrl.getAllMappings(function(hostList) {
      router.driverMappingCtrl.getAllMappings(function(driverList) {
        var retVal = hostList.hostsBucket;

        retVal = retVal.map((host) => {
            host.drivers = host.drivers.map((driver) => {
              driver.students = _.findWhere(driverList.driversBucket, { personId: driver.personId }).students;

              return driver;
            });

            return host;
        });

        global.mailService.sendMailToHosts(retVal);
      });
    });

    res.send("Done!");

  }, function loggedOut() {
    res.redirect("/");
  });
});



module.exports = router;
