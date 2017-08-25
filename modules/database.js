module.exports = function(db, sequelize) {
  var config = {
    freezeTableName: true
  };

  var User = db.define("user", {
    userId: {
      primaryKey: true,
      type: sequelize.INTEGER,
      autoIncrement: true
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
  }, config);

  var Student = db.define("student", {
    studentId: {
      primaryKey: true,
      type: sequelize.INTEGER,
      autoIncrement: true
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
    },
    attendance: {
      type: sequelize.BOOLEAN,
      defaultValue: false
    },
    university: {
      type: sequelize.STRING
    }
  }, config);

  var Person = db.define("person", {
    personId: {
      primaryKey: true,
      type: sequelize.INTEGER,
      autoIncrement: true
    },
    fullname: {
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
    },
    displayId: {
      type: sequelize.STRING
    },
    totalSeats: {
      type: sequelize.STRING
    },
    maxGuests: {
      type: sequelize.STRING
    },
    preference: {
      type: sequelize.STRING
    },
    role: {
      type: sequelize.STRING
    },
    needNavigator: {
      type: sequelize.BOOLEAN,
      defaultValue: false
    }
  }, config);

  var StudentDriverMapping = db.define("studentDriverMapping", {
    studentId: {
      type: sequelize.INTEGER
    },
    driverId: {
      type: sequelize.INTEGER
    }
  }, config);

  var DriverHostMapping = db.define("driverHostMapping", {
    driverId: {
      type: sequelize.INTEGER
    },
    hostId: {
      type: sequelize.INTEGER
    }
  }, config);


  // DO NOT TOUCH !!!

  db.sync({
    force: false
  });

  return {
    'userModel': User,
    'studentModel': Student,
    'personModel': Person,
    'studentDriverMappingModel': StudentDriverMapping,
    'driverHostMappingModel': DriverHostMapping
  };
};
