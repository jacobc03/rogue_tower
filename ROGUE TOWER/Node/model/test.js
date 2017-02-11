var Sequelize = require("sequelize");

var sequelize = require("../connection/connection.js");

var Test = sequelize.define("test", {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
    validate: {
      notNull: true
    }
  },
  password: {
    type: Sequelize.BOOLEAN,
    validate: {
      notNull: true
    }
  }
}, {
  timestamps: false
});

// Syncs with DB
Test.sync();

module.exports = Test;