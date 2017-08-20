var _ = require("underscore");
var hash = require("sha1");
var roles = require('../constants/roles.json');
var cloneDeep = require('clone-deep');

module.exports = function(databaseModels, db, injectTo) {
  var self = this;
  var key = "personCtrl";

  var methods = {
    addPerson: function(attr, callback) {
      var objectVal = {
        phone: attr.phone,
        email: attr.email,
        fullname: attr.fullname,
        role: attr.role,
        displayId: attr.displayId
      };

      if (attr.role === "driver") {
        objectVal.totalSeats = attr.totalSeats;
        objectVal.needNavigator = attr.needNavigator ? attr.needNavigator : false;
      } else if (attr.role === "host") {
        objectVal.maxGuests = attr.maxGuests;
        objectVal.preference = attr.preference;
        objectVal.address = attr.address;
      }

      databaseModels.personModel.create(objectVal)
        .done((person, created) => {
          callback(person);
        });
    },
    getPersonByRole: function(role, callback) {
      databaseModels.personModel.findAll({
        where: {
          "role": role
        }
      }).then((persons) => {
        persons = _.sortBy(persons, "fullname");
        callback(persons);
      });
    },
    deletePerson: function(attr, callback) {
      var personPointer;
      databaseModels.personModel.findOne({
        where: {
          personId: attr.personId
        },
        raw: true
      }).then((person) => {
        personPointer = cloneDeep(person);
        databaseModels.personModel.destroy({
          where: {
            personId: attr.personId
          }
        }).then(function() {
          if (!personPointer) {
            return;
          }

          if (personPointer.role === "driver") {
            databaseModels.driverHostMappingModel.destroy({
              where: {
                driverId: personPointer.personId
              }
            }).then((maps) => {
              databaseModels.studentDriverMappingModel.destroy({
                where: {
                  driverId: personPointer.personId
                }
              }).then((maps) => {
                callback(maps);
              });
            });
          } else if (personPointer.role === "host") {
            databaseModels.driverHostMappingModel.destroy({
              where: {
                hostId: personPointer.personId
              }
            }).then((maps) => {
              callback(maps);
            });
          }
        })
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
