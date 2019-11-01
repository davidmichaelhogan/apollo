import Sequelize from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false
  }
);

const database = {};
process.env.MODELS.split(":").forEach(file => {
  const model = require(`./${file}.js`);
  const Model = model(sequelize, Sequelize);
  database[Model.name] = Model;
});

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export default database;
