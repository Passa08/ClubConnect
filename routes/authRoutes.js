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
  console.log('🔍 Dashboard route accessed');
  console.log('📊 Session userId:', req.session.userId);
  
  if (!req.session.userId) {
    console.log('❌ No userId in session, redirecting to login');
    return res.redirect('/login');
  }
  
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user) {
      console.log('❌ User not found in database, redirecting to login');
      return res.redirect('/login');
    }
    
    console.log('✅ User found for dashboard:', { id: user.id, name: user.name, role: user.role });
    
    const clubs = await Club.findAll();
    const campaigns = await Campaign.findAll({
      include: [Club]
    });
    
    console.log('📊 Found clubs:', clubs.length, 'campaigns:', campaigns.length);
    
    // Show different dashboard based on user role
    if (user.role === 'admin') {
      console.log('👑 Rendering admin dashboard');
      res.render('dashboard', { user, clubs, campaigns });
    } else {
      console.log('👤 Rendering member dashboard');
      res.render('member-dashboard', { user, clubs, campaigns });
    }
  } catch (err) {
    console.error('❌ Dashboard error:', err);
    res.redirect('/login');
  }
});

module.exports = router;
