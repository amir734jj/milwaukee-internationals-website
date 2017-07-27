var _ = require("underscore");
var hash = require("sha1");

module.exports = function(personModel, db, injectTo) {
  var self = this;
  var key = "personCtrl";

  var methods = {
    addPerson: function(attr, callback) {
      var objectVal = {
        phone: attr.phone,
        email: attr.email,
        fullname: attr.fullname,
        role: attr.role
      };

      if (attr.role === "Driver") {
        objectVal.totalSeats = attr.totalSeats;
      } else if (attr.role === "Host") {
        objectVal.maxGuests = attr.maxGuests;
        objectVal.preference = attr.preference;
      }

      personModel.create(objectVal)
        .done((person, created) => {
          callback(person);
        });
    },
    getPersonByRole: function(role, callback) {
      personModel.findAll({
        where: {
          "role": role
        }
      }).then((persons) => {
        callback(persons);
      });
    }
  };

  /* inject controller to routers */
  injectTo = _.isArray(injectTo) ? injectTo : [injectTo];

  injectTo.map((router) => {
    if (_.isObject(router)) {
      router[key] = (function(personModel, db) {
        return methods;
      })(personModel, db);
    }
  });

  return methods;
};
