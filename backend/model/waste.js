import db from "../config/db.js";
import { Sequelize } from "sequelize";

const Waste = db.define("Waste", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    recyclable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    eco_points: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tips: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
});

export { Waste };