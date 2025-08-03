const { DataTypes } = require('sequelize');
const db = require('../public/config/db');
const User = require('./user');
const Campaign = require('./campaign');

const Volunteer = db.define('Volunteer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  registeredAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Define relationships
Volunteer.belongsTo(User);
Volunteer.belongsTo(Campaign);

module.exports = Volunteer; 