const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Waste = sequelize.define('Waste', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    recyclable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    eco_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tips: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'wastes',
    timestamps: true, // karena kolom created_at manual
    underscored: true,
});

module.exports = Waste;

