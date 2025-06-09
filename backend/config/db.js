import { Sequelize } from "sequelize";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to database..");
// console.log(process.env.MYSQL_INSTANCE_HOST)
// console.log(process.env.MYSQL_INSTANCE_USERNAME)
// console.log(process.env.MYSQL_INSTANCE_PASS)
// console.log(process.env.MYSQL_INSTANCE_DB)
const db = new Sequelize(
  process.env.MYSQL_INSTANCE_DB,
  process.env.MYSQL_INSTANCE_USERNAME,
  process.env.MYSQL_INSTANCE_PASS,
  {
    host: process.env.MYSQL_INSTANCE_HOST,
    // port: 3306,
    dialect: 'mysql',
    logging: false,
  }
);

export default db;