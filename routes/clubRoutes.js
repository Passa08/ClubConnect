const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.redirect('/');
  }
}

// Route to show the admin dashboard
router.get('/dashboard', isAdmin, clubController.showDashboard);

// Route to create a new campaign
router.post('/create-campaign', isAdmin, clubController.createCampaign);

module.exports = router;
