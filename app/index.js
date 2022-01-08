const express = require("express");
const characterRoutes = require("./routes/characters");
const sequelize = require("./util/database");
const Character = require("./models/Character");
const Movie = require("./models/Movie");
const Gender = require("./models/Gender");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
  next();
}) */

app.use("/users", require("./routes/users"));
app.use("/api/v1/characters", characterRoutes);

async function createTables() {
  try {
    Movie.belongsToMany(Character, { through: "characters_movies" }),
      Character.belongsToMany(Movie, { through: "characters_movies" }),
      Gender.hasMany(Movie, { foreignKey: "gender_id" }),
      Movie.belongsTo(Gender);
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error(error);
  }
}
//createTables();
app.listen(process.env.EXTERNAL_PORT || 3002);
console.log("server runing in: 3002");
