var _ = require("underscore");
var hash = require("sha1");
var roles = require('../constants/roles.json');
var cloneDeep = require('clone-deep');

module.exports = function(databaseModels, db, injectTo) {
  var self = this;
  var key = "driverMappingCtrl";

  var methods = {
    addMap: function(attr, callback) {
      databaseModels.studentDriverMappingModel.create({
          studentId: attr.studentId,
          driverId: attr.driverId
        })
        .done((map, created) => {
          callback(map);
        });
    },
    deleteMap: function(attr, callback) {
      databaseModels.studentDriverMappingModel.destroy({
        where: {
          studentId: attr.studentId,
          driverId: attr.driverId
        }
      }).then((map) => {
        callback(map);
      });
    },
    getAllMappings: function(callback) {
      var self = this;

      databaseModels.studentModel.findAll({
        raw: true
      }).then((students) => {
        self.students = students;

        databaseModels.personModel.findAll({
          where: {
            role: "driver"
          },
          raw: true
        }).then((drivers) => {
          self.drivers = cloneDeep(drivers);
          self.connectedStudents = [];

          databaseModels.studentDriverMappingModel.findAll({
            raw: true
          }).then((maps) => {

            var retVal = self.drivers.map((driver) => {
              driver.students = _.where(maps, {
                "driverId": driver.personId
              });

              driver.students = driver.students.map((student) => {
                return _.findWhere(self.students, {
                  "studentId": student.studentId
                });
              });

              self.connectedStudents = self.connectedStudents.concat(driver.students);

              return driver;
            });

            callback({
              "driversBucket": retVal,
              "studentsBucket": _.difference(self.students, self.connectedStudents),
              "allDrivers": self.drivers,
              "allAvailableDrivers": _.filter(retVal, (driver) => driver.students.length < driver.totalSeats),
              "allStudents": self.students,
              "maps": maps
            });

          });
        })
      });
    },
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
