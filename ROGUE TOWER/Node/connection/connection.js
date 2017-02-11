var Sequelize = require("sequelize");
var key = require("key.js");

var sequelize = new Sequelize(key.db, key.username, key.password, {
    host: key.host,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
});

module.exports = sequelize;