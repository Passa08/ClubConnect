const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user');
const Club = require('../models/club');
const Campaign = require('../models/campaign');

// Test route to verify routing
router.get('/test', (req, res) => {
  console.log('✅ Test route accessed');
  res.send('Test route working!');
});

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
  console.log('🔍 === DASHBOARD ROUTE ACCESSED ===');
  console.log('📊 Session data:', req.session);
  console.log('📊 Session userId:', req.session.userId);
  console.log('📊 Session ID:', req.sessionID);
  
  if (!req.session.userId) {
    console.log('❌ No userId in session, redirecting to login');
    return res.redirect('/login');
  }
  
  try {
    console.log('🔍 Looking up user with ID:', req.session.userId);
    const user = await User.findByPk(req.session.userId);
    
    if (!user) {
      console.log('❌ User not found in database, redirecting to login');
      return res.redirect('/login');
    }
    
    console.log('✅ User found for dashboard:', { 
      id: user.id, 
      name: user.name, 
      role: user.role,
      isVerified: user.isVerified 
    });
    
    console.log('🔍 Fetching clubs and campaigns...');
    const clubs = await Club.findAll();
    const campaigns = await Campaign.findAll({
      include: [Club]
    });
    
    console.log('📊 Found clubs:', clubs.length, 'campaigns:', campaigns.length);
    
    // Show different dashboard based on user role
    if (user.role === 'admin') {
      console.log('👑 Rendering admin dashboard for user:', user.name);
      try {
        res.render('dashboard', { user, clubs, campaigns });
      } catch (renderError) {
        console.error('❌ Admin dashboard render error:', renderError);
        res.send(`
          <h1>Admin Dashboard</h1>
          <p>Welcome ${user.name}!</p>
          <p>Role: ${user.role}</p>
          <p>Clubs: ${clubs.length}</p>
          <p>Campaigns: ${campaigns.length}</p>
          <a href="/logout">Logout</a>
        `);
      }
    } else {
      console.log('👤 Rendering member dashboard for user:', user.name);
      try {
        res.render('member-dashboard', { user, clubs, campaigns });
      } catch (renderError) {
        console.error('❌ Member dashboard render error:', renderError);
        res.send(`
          <h1>Member Dashboard</h1>
          <p>Welcome ${user.name}!</p>
          <p>Role: ${user.role}</p>
          <p>Clubs: ${clubs.length}</p>
          <p>Campaigns: ${campaigns.length}</p>
          <a href="/logout">Logout</a>
        `);
      }
    }
  } catch (err) {
    console.error('❌ Dashboard error:', err);
    console.error('❌ Error stack:', err.stack);
    res.redirect('/login');
  }
});

module.exports = router;
