const db = require('../public/config/db');

const User = require('./user');
const Club = require('./club');
const Campaign = require('./campaign');
const Volunteer = require('./volunteer');

// Add relationships if needed here
Campaign.belongsTo(Club);
// You can also: Club.hasMany(Campaign);

module.exports = {
  db,
  User,
  Club,
  Campaign,
  Volunteer
};
