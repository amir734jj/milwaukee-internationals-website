var _ = require("underscore");
var hash = require("sha1");
var roles = require('../constants/roles.json');
var cloneDeep = require('clone-deep');

module.exports = function(databaseModels, db, injectTo) {
  var self = this;
  var key = "utilityCtrl";

  var methods = {



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
