var _ = require("underscore");
var hash = require("sha1");
var roles = require('../constants/roles.json');
var cloneDeep = require('clone-deep');

module.exports = function(databaseModels, db, injectTo) {
  var self = this;
  var key = "hostMappingCtrl";

  var methods = {
    addMap: function(attr, callback) {
      databaseModels.driverHostMappingModel.create({
          driverId: attr.driverId,
          hostId: attr.hostId
        })
        .done((map, created) => {
          callback(map);
        });
    },
    deleteMap: function(attr, callback) {
      databaseModels.driverHostMappingModel.destroy({
        where: {
          driverId: attr.driverId,
          hostId: attr.hostId
        }
      }).then((map) => {
        callback(map);
      });
    },
    getAllMappings: function(callback) {
      var self = this;

      databaseModels.personModel.findAll({
        where: {
          role: "driver"
        },
        raw: true
      }).then((drivers) => {
        self.drivers = drivers;

        databaseModels.personModel.findAll({
          where: {
            role: "host"
          },
          raw: true
        }).then((hosts) => {
          self.hosts = cloneDeep(hosts);
          self.connectedDrivers = [];

          databaseModels.driverHostMappingModel.findAll({
            raw: true
          }).then((maps) => {

            var retVal = self.hosts.map((host) => {

              host.drivers = _.where(maps, {
                "hostId": host.personId
              });

              host.drivers = host.drivers.map((driver) => {
                return _.findWhere(self.drivers, {
                  "personId": driver.driverId
                });
              });

              self.connectedDrivers = self.connectedDrivers.concat(host.drivers);

              return host;
            });

            callback({
              "hostsBucket": retVal,
              "driversBucket": _.difference(self.drivers, self.connectedDrivers),
              "allHosts": self.hosts,
              // "allAvailableHosts": _.filter(retVal, (host) => host.drivers.length < hosts.maxGuests),
              "allAvailableHosts": retVal,
              "allDrivers": self.drivers,
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
