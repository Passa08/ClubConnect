const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const Volunteer = require('../models/volunteer');

// View all active campaigns (public/member)
router.get('/', campaignController.viewAllCampaigns);

// Volunteer for a campaign
router.post('/:campaignId/volunteer', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Please login to volunteer' });
  }

  try {
    const { campaignId } = req.params;
    const { message } = req.body;

    // Check if already volunteered
    const existingVolunteer = await Volunteer.findOne({
      where: {
        UserId: req.session.userId,
        CampaignId: campaignId
      }
    });

    if (existingVolunteer) {
      return res.status(400).json({ error: 'You have already volunteered for this campaign' });
    }

    // Create volunteer record
    await Volunteer.create({
      UserId: req.session.userId,
      CampaignId: campaignId,
      message: message || null
    });

    res.json({ success: true, message: 'Volunteer registration successful!' });
  } catch (error) {
    console.error('Volunteer registration error:', error);
    res.status(500).json({ error: 'Failed to register as volunteer' });
  }
});

// Get volunteer status for a campaign
router.get('/:campaignId/volunteer-status', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Please login' });
  }

  try {
    const { campaignId } = req.params;
    
    const volunteer = await Volunteer.findOne({
      where: {
        UserId: req.session.userId,
        CampaignId: campaignId
      }
    });

    res.json({ 
      hasVolunteered: !!volunteer,
      status: volunteer ? volunteer.status : null
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get volunteer status' });
  }
});

module.exports = router;
