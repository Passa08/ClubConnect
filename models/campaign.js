const { DataTypes } = require('sequelize');
const db = require('../public/config/db');
const Club = require('./club');

const Campaign = db.define('Campaign', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATEONLY,
  active: DataTypes.BOOLEAN
});

Campaign.belongsTo(Club);
module.exports = Campaign;
