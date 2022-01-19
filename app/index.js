const express = require("express");
const characterRoutes = require("./routes/characters");
const moviesRoutes = require("./routes/movies");
const gendersRoutes = require("./routes/genders");
const authRoutes = require("./routes/authUsers");
const sequelize = require("./util/database");
const Character = require("./models/Character");
const User = require("./models/user"); 
// no entiendo pq pero si no importo el modelo no crea la tabla
const Movie = require("./models/Movie");
const Gender = require("./models/Genders");
const morgan = require("morgan");
require('dotenv').config()


const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
  next();
}) */

const baseUrl = "/api/v1";

app.use(`${baseUrl}/characters`, characterRoutes);
app.use(`${baseUrl}/movies`, moviesRoutes);
app.use(`${baseUrl}/genders`, gendersRoutes);
app.use(`${baseUrl}/auth`, authRoutes);

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
createTables();

app.listen(process.env.EXTERNAL_PORT || 3002);
if (process.env.EXTERNAL_PORT) {
  console.log("server runing in:", process.env.EXTERNAL_PORT);
} else {
  console.log("server runing in: 3002");
}
