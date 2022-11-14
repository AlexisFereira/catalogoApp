const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejs-mysql", "alexis", "123", {
  host: "localhost",
  dialect: "mysql",
  port: 8889,
});

module.exports = sequelize;
