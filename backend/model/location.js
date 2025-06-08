const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Location = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  waste_type: {
    type: DataTypes.ENUM('Plastik', 'Kertas', 'Logam', 'Organik', 'Elektronik', 'B3'),
    allowNull: false,
  },
}, {
  tableName: 'locations',
  timestamps: true, // karena kolom created_at manual
  underscored: true,
});

module.exports = Location;

