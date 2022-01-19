const Sequelize = require("sequelize");
const db = require("../util/database");
const Character = require("./Character");
const Gender = require("./Genders");

const Movie = db.define(
  "movie",
  {
    movie_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    fecha_de_creacion: {
      type: Sequelize.DATEONLY,
    },
    score: {
      type: Sequelize.INTEGER,
    },
    is_movie: {
      type: Sequelize.BOOLEAN,
    },
    gender_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Movie;
