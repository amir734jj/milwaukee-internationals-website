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
          interests: attr.interests,
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
    },
    deleteStudent: function(attr, callback) {
      studentModel.destroy({
        where: {
          studentId: attr.studentId
        }
      }).then((student) => {
        callback(student);
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
