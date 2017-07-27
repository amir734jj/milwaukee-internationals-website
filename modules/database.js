module.exports = function(db, sequelize) {
  var User = db.define("user", {
    userId: {
      primaryKey: true,
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4
    },
    firstName: {
      type: sequelize.STRING
    },
    lastName: {
      type: sequelize.STRING
    },
    email: {
      type: sequelize.STRING,
      unique: true
    },
    password: {
      type: sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  var Student = db.define("student", {
    studentId: {
      primaryKey: true,
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4
    },
    fullname: {
      type: sequelize.STRING
    },
    major: {
      type: sequelize.STRING
    },
    email: {
      type: sequelize.STRING
    },
    phone: {
      type: sequelize.STRING
    },
    country: {
      type: sequelize.STRING
    },
    interests: {
      type: sequelize.STRING
    },
    date: {
      type: sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  var Person = db.define("person", {
    personId: {
      type: sequelize.STRING
    },
    firstName: {
      type: sequelize.STRING
    },
    lastName: {
      type: sequelize.STRING
    },
    email: {
      type: sequelize.STRING
    },
    phone: {
      type: sequelize.STRING
    },
    address: {
      type: sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  var DriverDetail = db.define("driverDetail", {
    personId: {
      type: sequelize.STRING
    },
    driverId: {
      type: sequelize.STRING
    },
    totalSeats: {
      type: sequelize.STRING
    },
    seatsAvailable: {
      type: sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  var HostDetail = db.define("hostDetail", {
    personId: {
      type: sequelize.STRING
    },
    hostId: {
      type: sequelize.STRING
    },
    maxGuests: {
      type: sequelize.STRING
    },
    preference: {
      type: sequelize.STRING
    },
  }, {
    freezeTableName: true
  });

  var StudentDriverMapping = db.define("studentDriverMapping", {
    studentId: {
      type: sequelize.STRING
    },
    driverId: {
      type: sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  var DriverHostMapping = db.define("driverHostDetail", {
    driverId: {
      type: sequelize.STRING
    },
    hostId: {
      type: sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  db.sync({
    force: false
  });

  return {
    'userModel': User,
    'studentModel': Student,
    'personModel': Person,
    'DriverDetailModel': DriverDetail,
    'HostDetailModel': HostDetail,
    'StudentDriverMappingModel': StudentDriverMapping,
    'DriverHostMappingModel': DriverHostMapping
  };
};
