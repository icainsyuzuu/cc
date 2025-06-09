import { Sequelize } from "sequelize";
import "dotenv/config";

const db = new Sequelize(
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASS,
  "ecowaste",
  "root",
  "",
  {
    host: process.env.DB_HOST || 'localhost',
    // port: 3306,
    dialect: 'mysql',
    logging: false,
  }
);

export default db;