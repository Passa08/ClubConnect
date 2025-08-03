const Club = require('../models/club');
const Campaign = require('../models/campaign');

// Show admin dashboard
exports.showDashboard = async (req, res) => {
  try {
    const clubs = await Club.findAll();
    const campaigns = await Campaign.findAll({
      include: [Club]
    });
    res.render('dashboard', { clubs, campaigns, user: req.session.user });
  } catch (err) {
    res.status(500).send('Error loading dashboard: ' + err.message);
  }
};

// Create a new campaign
exports.createCampaign = async (req, res) => {
  const { title, description, date, clubId } = req.body;
  
  try {
    await Campaign.create({
      title,
      description,
      date,
      clubId,
      active: true
    });
    res.redirect('/clubs/dashboard');
  } catch (err) {
    res.status(500).send('Error creating campaign: ' + err.message);
  }
};
