import db from "../config/db.js";
import { Sequelize } from "sequelize";

const User = db.define("User", {
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password_hash: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    profile_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    eco_points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

export { User };