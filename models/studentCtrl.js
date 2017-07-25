var _ = require("underscore");
var hash = require("sha1");

module.exports = function(studentModel, db, injectTo) {
  var self = this;
  var key = "studentCtrl";

  var methods = {
    addStudent: function(attr, successCallback, failCallback) {
      studentModel.create({
          fullname: attr.fullname,
          major: attr.major,
          email: attr.email,
          phone: attr.phone,
          country: attr.country,
          interest: attr.interest,
          date: new Date().toString()
        })
        .done((student, created) => {
          successCallback(student);
        });
    },
    getAllStudents: function(callback) {
      studentModel.findAll().then((students) => {
        callback(students);
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
