const Sequelize = require("sequelize");

//docker
 const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres'
  }
) 

//local 
/*
const sequelize = new Sequelize("alkemy", "alkemy", "alkemy", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    requiere: 30000,
    idle: 1000,
  },
  logging: false,
});
*/
module.exports = sequelize;

//podria usar db local, pero esta bueno para aprender, host ahora es el service que definimos en el el docker-compose
