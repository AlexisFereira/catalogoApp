const Sequelize = require("sequelize");

const sequelize = require("../db/database");

const Cart = sequelize.define("cart-item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = Cart;
