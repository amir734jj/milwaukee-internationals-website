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

  db.sync({
    force: false
  });

  return {
    'userModel': User
  };
};
