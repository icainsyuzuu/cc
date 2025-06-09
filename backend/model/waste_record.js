import db from "../config/db.js";
import { Sequelize } from "sequelize";

const WasteRecord = db.define("wasterecords", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  location_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  waste_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  weight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  date_collected: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

export { WasteRecord };