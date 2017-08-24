var _ = require("underscore");
var hash = require("sha1");

module.exports = function(userModel, db, injectTo) {
  var self = this;
  var key = "userCtrl";

  var methods = {
    containsUser: function(attr, successCallback, failCallback) {
      userModel.findOne({
        where: {
          email: attr.email,
          password: hash(attr.password)
        }
      }).then(function(user) {
        if (user) {
          successCallback(user);
        } else {
          failCallback();
        }
      });
    },
    addUser: function(attr, successCallback, failCallback) {
      userModel.findOrCreate({
          where: {
            email: attr.email
          },
          defaults: {
            password: hash(attr.password),
            firstName: attr.firstName,
            lastName: attr.lastName,
            hashcode: hash(JSON.stringify(attr))
          }
        })
        .spread((user, created) => {
          if (created) {
            successCallback(user);
          } else {
            failCallback(user);
          }
        });
    },
    getAllUsers: function(callback) {
      userModel.findAll().then((users) => {
        callback(users);
      });
    },
    deleteUser: function(attr, callback) {
      userModel.findOne({
        where: {
          userId: attr.userId
        }
      }).then((user) => {
        userModel.destroy({
            where: {
                userId: attr.userId
            }
        }).then((nrows) => {
            userModel.destroy({
                where: {
                    userId: attr.userId
                }
            }).then((nrows) => {
                callback(user);
            });
        });
      });
    }
  };

  /* inject controller to routers */
  injectTo = _.isArray(injectTo) ? injectTo : [injectTo];

  injectTo.map((router) => {
    if (_.isObject(router)) {
      router[key] = (function(userModel, db) {
        return methods;
      })(userModel, db);
    }
  });

  return methods;
};
