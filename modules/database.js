module.exports = function(db, sequelize) {
  var User = db.define("user", {
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
    },
    hashcode: {
      type: sequelize.STRING,
      unique: true
    }
  }, {
    freezeTableName: true
  });

  var Student = db.define("student", {
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
    interest: {
      type: sequelize.STRING
    },
    date: {
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
    'studentModel': Student
  };
};
