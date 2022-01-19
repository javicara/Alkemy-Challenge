const Sequelize = require("sequelize");
const db = require("../util/database");

const CharacterMovies = db.define(
  "characters_movies",
  {
    movieMovieId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    characterCharacterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  {
    timestamps: false,
  }
);

module.exports = CharacterMovies;
