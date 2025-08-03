const { DataTypes } = require('sequelize');
const db = require('../public/config/db');

const Club = db.define('Club', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contact_whatsapp: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Club;
