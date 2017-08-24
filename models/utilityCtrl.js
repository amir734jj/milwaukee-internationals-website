var _ = require("underscore");
var hash = require("sha1");
var roles = require('../constants/roles.json');
var cloneDeep = require('clone-deep');

module.exports = function(databaseModels, db, injectTo) {
  var self = this;
  var key = "utilityCtrl";

  var methods = {
      getAll: function(callback){
        var userCtrl = require('../models/userCtrl')(databaseModels.userModel, db, []);
        var studentCtrl = require('../models/studentCtrl')(databaseModels, db, []);
        var personCtrl = require('../models/personCtrl')(databaseModels, db, []);

        var retVal = {};

        userCtrl.getAllUsers((users) => {
          retVal["users"] = users;

          studentCtrl.getAllStudents((students) => {
            retVal["students"] = students;

            personCtrl.getPersonByRole("driver", (drivers) => {
              retVal["drivers"] = drivers;

              personCtrl.getPersonByRole("host", (hosts) => {
                retVal["hosts"] = hosts;

                callback(retVal);
              });

            });

          });
        });


      }
  };

  /* inject controller to routers */
  injectTo = _.isArray(injectTo) ? injectTo : [injectTo];

  injectTo.map((router) => {
    if (_.isObject(router)) {
      router[key] = (function(databaseModels, db) {
        return methods;
      })(databaseModels, db);
    }
  });

  return methods;
};
