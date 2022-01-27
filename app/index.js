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
const path = require("path");
//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.EXTERNAL_PORT || 3002

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alkemy doc",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};
/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
  next();
}) */

const baseUrl = "/api/v1";

app.use(
  `${baseUrl}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
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

app.listen(port);
if (port) {
  console.log("server runing in:", port);
  console.log(`To see the API documentation, please visit http://localhost:${port}/api/v1/docs/`)
} 
