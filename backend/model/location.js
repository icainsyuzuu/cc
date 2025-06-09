import db from "../config/db.js";
import { Sequelize } from "sequelize";

const Location = db.define("locations", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    province: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    waste_type: {
        type: Sequelize.ENUM('Plastik', 'Kertas', 'Logam', 'Organik', 'Elektronik', 'B3'),
        allowNull: false,
    },
    waste_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

export { Location };