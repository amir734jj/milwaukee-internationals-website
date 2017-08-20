var _ = require("underscore");
var hash = require("sha1");

module.exports = function(databaseModels, db, injectTo) {
  var self = this;
  var key = "studentCtrl";

  var methods = {
    addStudent: function(attr, successCallback, failCallback) {
      databaseModels.studentModel.create({
          fullname: attr.fullname,
          major: attr.major,
          university: attr.university,
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
      databaseModels.studentModel.findAll().then((students) => {
        students = _.sortBy(students, "fullname");
        callback(students);
      });
    },
    deleteStudent: function(attr, callback) {
      databaseModels.studentModel.findOne({
        where: {
          studentId: attr.studentId
        }
      }).then((student) => {
        databaseModels.studentModel.destroy({
            where: {
                studentId: attr.studentId
            }
        }).then((nrows) => {
            databaseModels.studentDriverMappingModel.destroy({
                where: {
                    studentId: attr.studentId
                }
            }).then((nrows) => {
                callback(student);
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
