const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const User = require('../models/user');

// Middleware to check if user is admin
async function isAdmin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== 'admin') {
      return res.redirect('/');
    }
    req.user = user; // Add user to request object
    next();
  } catch (err) {
    res.redirect('/login');
  }
}

// Route to show the admin dashboard
router.get('/dashboard', isAdmin, clubController.showDashboard);

// Route to create a new campaign
router.post('/create-campaign', isAdmin, clubController.createCampaign);

module.exports = router;
