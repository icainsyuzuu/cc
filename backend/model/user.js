const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // sesuaikan path

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  profile_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  eco_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'users',     // Nama tabel sesuai DB
  timestamps: true,       // Gunakan createdAt & updatedAt
  underscored: true,      // Gunakan snake_case di DB: created_at, updated_at
});

module.exports = User;
