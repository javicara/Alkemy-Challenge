const sequelize = require("./util/database");
const Character = require("./models/Character");
const Movie = require("./models/Movie");
const Gender = require("./models/Gender");


async function createTables() {
    try {
      Movie.belongsToMany(Character, { through: "characters_movies" }),
        Character.belongsToMany(Movie, { through: "characters_movies" }),
        Gender.hasMany(Movie, { foreignKey: "gender_id" }),
        Movie.belongsTo(Gender, { foreignKey: "gender_id" });
      await sequelize.sync({ force: false });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTables() {
      try {
        await sequelize.drop({ alter: true });
      } catch (error) {
        console.error(error);
      }
  }

  createTables();
  //deleteTables();
