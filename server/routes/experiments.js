
const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { mockExperiments } = require('../data/mockData'); // Kept for fallback

// Get all experiments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM experiments');
    
    // For each experiment, get variants data
    for (let i = 0; i < rows.length; i++) {
      // Get variants
      const [variants] = await pool.query(
        'SELECT * FROM experiment_variants WHERE experiment_id = ?',
        [rows[i].id]
      );
      
      // Format variants object
      const variantsObj = {};
      variants.forEach(variant => {
        variantsObj[variant.variant_key] = {
          name: variant.name,
          impressions: variant.impressions,
          clicks: variant.clicks,
          conversions: variant.conversions
        };
      });
      
      rows[i].variants = variantsObj;
    }
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching experiments:', error);
    // Fallback to mock data if database fails
    res.json(mockExperiments);
  }
});

// Get experiment by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM experiments WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    
    // Get variants
    const [variants] = await pool.query(
      'SELECT * FROM experiment_variants WHERE experiment_id = ?',
      [req.params.id]
    );
    
    // Format variants object
    const variantsObj = {};
    variants.forEach(variant => {
      variantsObj[variant.variant_key] = {
        name: variant.name,
        impressions: variant.impressions,
        clicks: variant.clicks,
        conversions: variant.conversions
      };
    });
    
    const experiment = {
      ...rows[0],
      variants: variantsObj
    };
    
    res.json(experiment);
  } catch (error) {
    console.error(`Error fetching experiment ${req.params.id}:`, error);
    // Fallback to mock data
    const experiment = mockExperiments.find(e => e.id === req.params.id);
    if (!experiment) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    res.json(experiment);
  }
});

// Get experiments by campaign ID
router.get('/campaign/:campaignId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM experiments WHERE campaign_id = ?', 
      [req.params.campaignId]
    );
    
    // For each experiment, get variants data
    for (let i = 0; i < rows.length; i++) {
      // Get variants
      const [variants] = await pool.query(
        'SELECT * FROM experiment_variants WHERE experiment_id = ?',
        [rows[i].id]
      );
      
      // Format variants object
      const variantsObj = {};
      variants.forEach(variant => {
        variantsObj[variant.variant_key] = {
          name: variant.name,
          impressions: variant.impressions,
          clicks: variant.clicks,
          conversions: variant.conversions
        };
      });
      
      rows[i].variants = variantsObj;
    }
    
    res.json(rows);
  } catch (error) {
    console.error(`Error fetching experiments for campaign ${req.params.campaignId}:`, error);
    // Fallback to mock data
    const experiments = mockExperiments.filter(e => e.campaignId === req.params.campaignId);
    res.json(experiments);
  }
});

// Create new experiment
router.post('/', async (req, res) => {
  try {
    const { name, campaignId, startDate, endDate, status, variants, winner, confidence } = req.body;
    
    // Generate ID
    const id = `exp_${Math.random().toString(36).substring(2, 11)}`;
    
    // Insert basic experiment data
    await pool.query(
      'INSERT INTO experiments (id, name, campaign_id, start_date, end_date, status, winner, confidence) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, campaignId, startDate, endDate, status, winner, confidence]
    );
    
    // Insert variants
    if (variants) {
      for (const [key, variant] of Object.entries(variants)) {
        await pool.query(
          'INSERT INTO experiment_variants (experiment_id, variant_key, name, impressions, clicks, conversions) VALUES (?, ?, ?, ?, ?, ?)',
          [id, key, variant.name, variant.impressions || 0, variant.clicks || 0, variant.conversions || 0]
        );
      }
    }
    
    // Return newly created experiment
    res.status(201).json({ 
      id, 
      name, 
      campaignId, 
      startDate, 
      endDate, 
      status, 
      variants, 
      winner, 
      confidence 
    });
    
  } catch (error) {
    console.error('Error creating experiment:', error);
    res.status(500).json({ message: 'Failed to create experiment', error: error.message });
  }
});

// Update experiment
router.put('/:id', async (req, res) => {
  try {
    const { name, campaignId, startDate, endDate, status, variants, winner, confidence } = req.body;
    const experimentId = req.params.id;
    
    // Check if experiment exists
    const [existingExperiment] = await pool.query('SELECT * FROM experiments WHERE id = ?', [experimentId]);
    if (existingExperiment.length === 0) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    
    // Update base experiment
    await pool.query(
      'UPDATE experiments SET name = ?, campaign_id = ?, start_date = ?, end_date = ?, status = ?, winner = ?, confidence = ? WHERE id = ?',
      [name, campaignId, startDate, endDate, status, winner, confidence, experimentId]
    );
    
    // Update variants (delete and reinsert)
    if (variants) {
      await pool.query('DELETE FROM experiment_variants WHERE experiment_id = ?', [experimentId]);
      
      for (const [key, variant] of Object.entries(variants)) {
        await pool.query(
          'INSERT INTO experiment_variants (experiment_id, variant_key, name, impressions, clicks, conversions) VALUES (?, ?, ?, ?, ?, ?)',
          [experimentId, key, variant.name, variant.impressions || 0, variant.clicks || 0, variant.conversions || 0]
        );
      }
    }
    
    // Get updated experiment to return
    const [rows] = await pool.query('SELECT * FROM experiments WHERE id = ?', [experimentId]);
    res.json({ 
      ...rows[0], 
      variants: variants || {}
    });
    
  } catch (error) {
    console.error(`Error updating experiment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update experiment', error: error.message });
  }
});

// Delete experiment
router.delete('/:id', async (req, res) => {
  try {
    const experimentId = req.params.id;
    
    // Check if experiment exists
    const [existingExperiment] = await pool.query('SELECT * FROM experiments WHERE id = ?', [experimentId]);
    if (existingExperiment.length === 0) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    
    // Delete related data first (foreign key constraints)
    await pool.query('DELETE FROM experiment_variants WHERE experiment_id = ?', [experimentId]);
    
    // Delete the experiment
    await pool.query('DELETE FROM experiments WHERE id = ?', [experimentId]);
    
    res.json({ success: true, message: 'Experiment deleted successfully' });
  } catch (error) {
    console.error(`Error deleting experiment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete experiment', error: error.message });
  }
});

module.exports = router;
