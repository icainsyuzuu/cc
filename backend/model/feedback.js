import db from "../config/db.js";
import { Sequelize } from "sequelize";

const Feedback = db.define("feedbacks", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true, // This will add createdAt and updatedAt
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

export { Feedback };
