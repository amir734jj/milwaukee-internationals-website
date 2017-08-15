var authentication = require('../modules/authentication');
var express = require('express');
var router = express.Router();
var _ = require('underscore');

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


router.get('/mail', function(req, res, next) {
  authentication(req, function loggedIn() {
    router.driverMappingCtrl.getAllMappings(function(driverList) {
      router.hostMappingCtrl.getAllMappings(function(hostList) {

        var retVal = driverList.driversBucket;

        retVal = retVal.map((driver) => {
          driver.host = _.find(hostList.hostsBucket, (host) => {
            return _.findWhere(host.drivers, { personId: driver.personId});
          });

          return driver;
        });

        global.mailService.sendMailToDrivers(retVal);
      });
    });

    res.send("Done!");

  }, function loggedOut() {
    res.redirect("/");
  });
});


module.exports = router;
