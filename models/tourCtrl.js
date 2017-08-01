var _ = require("underscore");
var hash = require("sha1");
var countries = require('../constants/countries.json');

module.exports = function(studentModel, db, injectTo) {
  var self = this;
  var key = "tourCtrl";

  var methods = {
    getAllStudents: function(callback) {
      studentModel.findAll({
        raw: true
      }).then((students) => {
        callback(students);
      });
    },
    checkInStudent: function(attr, callback) {
      studentModel.update({
        attendance: attr.attendance
      }, {
        where: {
          studentId: attr.studentId,
        }
      }).done((student) => {
        callback(student);
      });
    },
    getStudentCountries: function(callback) {
      studentModel.findAll({
        raw: true
      }).then((students) => {
        var filteredCountries = _.pluck(students, "country");
        filteredCountries = _.uniq(filteredCountries);

        callback(filteredCountries);
      });
    }
  };

  /* inject controller to routers */
  injectTo = _.isArray(injectTo) ? injectTo : [injectTo];

  injectTo.map((router) => {
    if (_.isObject(router)) {
      router[key] = (function(studentModel, db) {
        return methods;
      })(studentModel, db);
    }
  });

  return methods;
};
