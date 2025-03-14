
const express = require('express');
const router = express.Router();
const { mockCampaigns } = require('../data/mockData');

// Get all campaigns
router.get('/', (req, res) => {
  res.json(mockCampaigns);
});

// Get campaign by ID
router.get('/:id', (req, res) => {
  const campaign = mockCampaigns.find(c => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  res.json(campaign);
});

// Create new campaign
router.post('/', (req, res) => {
  const newCampaign = {
    ...req.body,
    id: `camp_${Math.random().toString(36).substring(2, 11)}`
  };
  
  // In a real app, would save to database here
  res.status(201).json(newCampaign);
});

// Update campaign
router.put('/:id', (req, res) => {
  const campaign = mockCampaigns.find(c => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  
  const updatedCampaign = { ...campaign, ...req.body };
  // In a real app, would update database here
  
  res.json(updatedCampaign);
});

// Delete campaign
router.delete('/:id', (req, res) => {
  const campaign = mockCampaigns.find(c => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  
  // In a real app, would delete from database here
  res.json({ success: true, message: 'Campaign deleted successfully' });
});

module.exports = router;
