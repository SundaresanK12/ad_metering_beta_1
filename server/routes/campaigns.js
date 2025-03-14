
const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { mockCampaigns } = require('../data/mockData'); // Kept for fallback

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM campaigns');
    
    // For each campaign, get target profiles and metrics
    for (let i = 0; i < rows.length; i++) {
      // Get target profiles
      const [profiles] = await pool.query(
        'SELECT profile_id FROM campaign_profiles WHERE campaign_id = ?',
        [rows[i].id]
      );
      
      // Get metrics
      const [metrics] = await pool.query(
        'SELECT * FROM campaign_metrics WHERE campaign_id = ?',
        [rows[i].id]
      );
      
      rows[i].targetProfiles = profiles.map(p => p.profile_id);
      rows[i].metrics = metrics[0] || { impressions: 0, clicks: 0, conversions: 0, spend: 0 };
    }
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    // Fallback to mock data if database fails
    res.json(mockCampaigns);
  }
});

// Get campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Get target profiles
    const [profiles] = await pool.query(
      'SELECT profile_id FROM campaign_profiles WHERE campaign_id = ?',
      [req.params.id]
    );
    
    // Get metrics
    const [metrics] = await pool.query(
      'SELECT * FROM campaign_metrics WHERE campaign_id = ?',
      [req.params.id]
    );
    
    const campaign = {
      ...rows[0],
      targetProfiles: profiles.map(p => p.profile_id),
      metrics: metrics[0] || { impressions: 0, clicks: 0, conversions: 0, spend: 0 }
    };
    
    res.json(campaign);
  } catch (error) {
    console.error(`Error fetching campaign ${req.params.id}:`, error);
    // Fallback to mock data
    const campaign = mockCampaigns.find(c => c.id === req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  }
});

// Create new campaign
router.post('/', async (req, res) => {
  try {
    const { name, startDate, endDate, status, budget, targetProfiles, description, metrics } = req.body;
    
    // Generate ID
    const id = `camp_${Math.random().toString(36).substring(2, 11)}`;
    
    // Insert basic campaign data
    await pool.query(
      'INSERT INTO campaigns (id, name, start_date, end_date, status, budget, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, startDate, endDate, status, budget, description]
    );
    
    // Insert target profiles
    if (targetProfiles && targetProfiles.length) {
      const profileValues = targetProfiles.map(profileId => [id, profileId]);
      await pool.query(
        'INSERT INTO campaign_profiles (campaign_id, profile_id) VALUES ?',
        [profileValues]
      );
    }
    
    // Insert metrics
    if (metrics) {
      await pool.query(
        'INSERT INTO campaign_metrics (campaign_id, impressions, clicks, conversions, spend) VALUES (?, ?, ?, ?, ?)',
        [id, metrics.impressions || 0, metrics.clicks || 0, metrics.conversions || 0, metrics.spend || 0]
      );
    }
    
    // Return newly created campaign
    res.status(201).json({ 
      id, 
      name, 
      startDate, 
      endDate, 
      status, 
      budget, 
      targetProfiles, 
      description, 
      metrics: metrics || { impressions: 0, clicks: 0, conversions: 0, spend: 0 }
    });
    
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Failed to create campaign', error: error.message });
  }
});

// Update campaign
router.put('/:id', async (req, res) => {
  try {
    const { name, startDate, endDate, status, budget, targetProfiles, description, metrics } = req.body;
    const campaignId = req.params.id;
    
    // Check if campaign exists
    const [existingCampaign] = await pool.query('SELECT * FROM campaigns WHERE id = ?', [campaignId]);
    if (existingCampaign.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Update base campaign
    await pool.query(
      'UPDATE campaigns SET name = ?, start_date = ?, end_date = ?, status = ?, budget = ?, description = ? WHERE id = ?',
      [name, startDate, endDate, status, budget, description, campaignId]
    );
    
    // Update target profiles (delete and reinsert)
    if (targetProfiles) {
      await pool.query('DELETE FROM campaign_profiles WHERE campaign_id = ?', [campaignId]);
      if (targetProfiles.length) {
        const profileValues = targetProfiles.map(profileId => [campaignId, profileId]);
        await pool.query(
          'INSERT INTO campaign_profiles (campaign_id, profile_id) VALUES ?',
          [profileValues]
        );
      }
    }
    
    // Update metrics
    if (metrics) {
      const [existingMetrics] = await pool.query(
        'SELECT * FROM campaign_metrics WHERE campaign_id = ?', 
        [campaignId]
      );
      
      if (existingMetrics.length > 0) {
        await pool.query(
          'UPDATE campaign_metrics SET impressions = ?, clicks = ?, conversions = ?, spend = ? WHERE campaign_id = ?',
          [metrics.impressions, metrics.clicks, metrics.conversions, metrics.spend, campaignId]
        );
      } else {
        await pool.query(
          'INSERT INTO campaign_metrics (campaign_id, impressions, clicks, conversions, spend) VALUES (?, ?, ?, ?, ?)',
          [campaignId, metrics.impressions, metrics.clicks, metrics.conversions, metrics.spend]
        );
      }
    }
    
    // Get updated campaign to return
    const [rows] = await pool.query('SELECT * FROM campaigns WHERE id = ?', [campaignId]);
    res.json({ 
      ...rows[0], 
      targetProfiles: targetProfiles || [], 
      metrics: metrics || { impressions: 0, clicks: 0, conversions: 0, spend: 0 }
    });
    
  } catch (error) {
    console.error(`Error updating campaign ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update campaign', error: error.message });
  }
});

// Delete campaign
router.delete('/:id', async (req, res) => {
  try {
    const campaignId = req.params.id;
    
    // Check if campaign exists
    const [existingCampaign] = await pool.query('SELECT * FROM campaigns WHERE id = ?', [campaignId]);
    if (existingCampaign.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Delete related data first (foreign key constraints)
    await pool.query('DELETE FROM campaign_profiles WHERE campaign_id = ?', [campaignId]);
    await pool.query('DELETE FROM campaign_metrics WHERE campaign_id = ?', [campaignId]);
    await pool.query('DELETE FROM experiments WHERE campaign_id = ?', [campaignId]);
    
    // Delete the campaign
    await pool.query('DELETE FROM campaigns WHERE id = ?', [campaignId]);
    
    res.json({ success: true, message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error(`Error deleting campaign ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete campaign', error: error.message });
  }
});

module.exports = router;
