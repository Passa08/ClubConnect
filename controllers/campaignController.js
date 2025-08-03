const Campaign = require('../models/campaign');
const Club = require('../models/club');
const User = require('../models/user');

// Show all active campaigns (for members)
exports.viewAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      where: { active: true },
      include: Club
    });

    // Get user if logged in
    let user = null;
    if (req.session.userId) {
      user = await User.findByPk(req.session.userId);
    }

    res.render('campaigns', {
      campaigns,
      user
    });
  } catch (err) {
    res.send('Error fetching campaigns: ' + err.message);
  }
};
