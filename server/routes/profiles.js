
const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { mockProfiles } = require('../data/mockData'); // Kept for fallback

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profiles');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    // Fallback to mock data if database fails
    res.json(mockProfiles);
  }
});

// Get profile by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Get demographics for profile
    const [demographics] = await pool.query(
      'SELECT * FROM profile_demographics WHERE profile_id = ?', 
      [req.params.id]
    );
    
    // Get behavioral attributes for profile
    const [behavioralAttributes] = await pool.query(
      'SELECT * FROM profile_behaviors WHERE profile_id = ?', 
      [req.params.id]
    );
    
    // Get locations and interests (arrays)
    const [locations] = await pool.query(
      'SELECT location FROM profile_locations WHERE profile_id = ?',
      [req.params.id]
    );
    
    const [interests] = await pool.query(
      'SELECT interest FROM profile_interests WHERE profile_id = ?',
      [req.params.id]
    );
    
    const [planTypes] = await pool.query(
      'SELECT plan_type FROM profile_plan_types WHERE profile_id = ?',
      [req.params.id]
    );
    
    // Format response
    const profile = {
      ...rows[0],
      demographics: {
        ...(demographics[0] || {}),
        location: locations.map(loc => loc.location),
        interests: interests.map(int => int.interest)
      },
      behavioralAttributes: {
        ...(behavioralAttributes[0] || {}),
        planType: planTypes.map(plan => plan.plan_type)
      }
    };
    
    res.json(profile);
  } catch (error) {
    console.error(`Error fetching profile ${req.params.id}:`, error);
    // Fallback to mock data
    const profile = mockProfiles.find(p => p.id === req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  }
});

// Create new profile
router.post('/', async (req, res) => {
  try {
    const { name, segmentSize, campaigns, status, demographics, behavioralAttributes } = req.body;
    
    // Generate ID
    const id = `prof_${Math.random().toString(36).substring(2, 11)}`;
    
    // Insert basic profile data
    await pool.query(
      'INSERT INTO profiles (id, name, segment_size, campaigns, status) VALUES (?, ?, ?, ?, ?)',
      [id, name, segmentSize, campaigns, status]
    );
    
    // Insert demographics
    if (demographics) {
      await pool.query(
        'INSERT INTO profile_demographics (profile_id, age_range, income) VALUES (?, ?, ?)',
        [id, demographics.ageRange, demographics.income]
      );
      
      // Insert locations
      if (demographics.location && demographics.location.length) {
        const locationValues = demographics.location.map(loc => [id, loc]);
        await pool.query(
          'INSERT INTO profile_locations (profile_id, location) VALUES ?',
          [locationValues]
        );
      }
      
      // Insert interests
      if (demographics.interests && demographics.interests.length) {
        const interestValues = demographics.interests.map(interest => [id, interest]);
        await pool.query(
          'INSERT INTO profile_interests (profile_id, interest) VALUES ?',
          [interestValues]
        );
      }
    }
    
    // Insert behavioral attributes
    if (behavioralAttributes) {
      await pool.query(
        'INSERT INTO profile_behaviors (profile_id, device_usage, data_consumption) VALUES (?, ?, ?)',
        [id, behavioralAttributes.deviceUsage, behavioralAttributes.dataConsumption]
      );
      
      // Insert plan types
      if (behavioralAttributes.planType && behavioralAttributes.planType.length) {
        const planValues = behavioralAttributes.planType.map(plan => [id, plan]);
        await pool.query(
          'INSERT INTO profile_plan_types (profile_id, plan_type) VALUES ?',
          [planValues]
        );
      }
    }
    
    // Return newly created profile
    res.status(201).json({ ...req.body, id });
    
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Failed to create profile', error: error.message });
  }
});

// Update profile
router.put('/:id', async (req, res) => {
  try {
    const { name, segmentSize, campaigns, status, demographics, behavioralAttributes } = req.body;
    const profileId = req.params.id;
    
    // Check if profile exists
    const [existingProfile] = await pool.query('SELECT * FROM profiles WHERE id = ?', [profileId]);
    if (existingProfile.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Update base profile
    await pool.query(
      'UPDATE profiles SET name = ?, segment_size = ?, campaigns = ?, status = ? WHERE id = ?',
      [name, segmentSize, campaigns, status, profileId]
    );
    
    // Update demographics if provided
    if (demographics) {
      await pool.query(
        'UPDATE profile_demographics SET age_range = ?, income = ? WHERE profile_id = ?',
        [demographics.ageRange, demographics.income, profileId]
      );
      
      // Update locations (delete and reinsert)
      if (demographics.location) {
        await pool.query('DELETE FROM profile_locations WHERE profile_id = ?', [profileId]);
        if (demographics.location.length) {
          const locationValues = demographics.location.map(loc => [profileId, loc]);
          await pool.query(
            'INSERT INTO profile_locations (profile_id, location) VALUES ?',
            [locationValues]
          );
        }
      }
      
      // Update interests (delete and reinsert)
      if (demographics.interests) {
        await pool.query('DELETE FROM profile_interests WHERE profile_id = ?', [profileId]);
        if (demographics.interests.length) {
          const interestValues = demographics.interests.map(interest => [profileId, interest]);
          await pool.query(
            'INSERT INTO profile_interests (profile_id, interest) VALUES ?',
            [interestValues]
          );
        }
      }
    }
    
    // Update behavioral attributes if provided
    if (behavioralAttributes) {
      await pool.query(
        'UPDATE profile_behaviors SET device_usage = ?, data_consumption = ? WHERE profile_id = ?',
        [behavioralAttributes.deviceUsage, behavioralAttributes.dataConsumption, profileId]
      );
      
      // Update plan types (delete and reinsert)
      if (behavioralAttributes.planType) {
        await pool.query('DELETE FROM profile_plan_types WHERE profile_id = ?', [profileId]);
        if (behavioralAttributes.planType.length) {
          const planValues = behavioralAttributes.planType.map(plan => [profileId, plan]);
          await pool.query(
            'INSERT INTO profile_plan_types (profile_id, plan_type) VALUES ?',
            [planValues]
          );
        }
      }
    }
    
    // Get updated profile to return
    const [rows] = await pool.query('SELECT * FROM profiles WHERE id = ?', [profileId]);
    res.json({ ...rows[0], demographics, behavioralAttributes });
    
  } catch (error) {
    console.error(`Error updating profile ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// Delete profile
router.delete('/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    
    // Check if profile exists
    const [existingProfile] = await pool.query('SELECT * FROM profiles WHERE id = ?', [profileId]);
    if (existingProfile.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Delete related data first (foreign key constraints)
    await pool.query('DELETE FROM profile_locations WHERE profile_id = ?', [profileId]);
    await pool.query('DELETE FROM profile_interests WHERE profile_id = ?', [profileId]);
    await pool.query('DELETE FROM profile_plan_types WHERE profile_id = ?', [profileId]);
    await pool.query('DELETE FROM profile_demographics WHERE profile_id = ?', [profileId]);
    await pool.query('DELETE FROM profile_behaviors WHERE profile_id = ?', [profileId]);
    
    // Delete the profile
    await pool.query('DELETE FROM profiles WHERE id = ?', [profileId]);
    
    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(`Error deleting profile ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete profile', error: error.message });
  }
});

module.exports = router;
