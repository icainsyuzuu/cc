const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const WasteRecord = sequelize.define('WasteRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  waste_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_collected: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'waste_records',
  timestamps: true, // karena kolom created_at manual
  underscored: true,
});

module.exports = WasteRecord;