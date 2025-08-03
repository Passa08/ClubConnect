const Campaign = require('../models/campaign');
const Club = require('../models/club');

// Show all active campaigns (for members)
exports.viewAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      where: { active: true },
      include: Club
    });

    res.render('campaigns', {
      campaigns,
      user: req.session.user
    });
  } catch (err) {
    res.send('Error fetching campaigns: ' + err.message);
  }
};
