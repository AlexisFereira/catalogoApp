const Sequelize = require("sequelize");

const sequelize = require("../db/database");

const User = sequelize.define("user", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;
