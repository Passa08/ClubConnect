const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user');
const Club = require('../models/club');
const Campaign = require('../models/campaign');

// Views
router.get('/register', authController.showRegister);
router.get('/login', authController.showLogin);

// Actions
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Email verification route
router.get('/verify/:token', authController.verifyEmail);

// Dashboard route (protected)
router.get('/dashboard', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user) {
      return res.redirect('/login');
    }
    
    const clubs = await Club.findAll();
    const campaigns = await Campaign.findAll({
      include: [Club]
    });
    
    // Show different dashboard based on user role
    if (user.role === 'admin') {
      res.render('dashboard', { user, clubs, campaigns });
    } else {
      res.render('member-dashboard', { user, clubs, campaigns });
    }
  } catch (err) {
    res.redirect('/login');
  }
});

module.exports = router;
