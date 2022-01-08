const Sequelize = require('sequelize');
const db = require('../util/database');


  const Gender = db.define(
  "gender",
  {
    gender_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Gender;
