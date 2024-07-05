import { Sequelize } from "sequelize";

const password = process.env.DB_PASSWORD;

const connection = new Sequelize("notes", "root", password, {
  host: "localhost",
  dialect: "mysql",
});

export default connection;
