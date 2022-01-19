const Sequelize = require("sequelize");
const db = require("../util/database");

const User = db.define("users", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
