
const express = require('express');
const router = express.Router();
const { mockProfiles } = require('../data/mockData');

// Get all profiles
router.get('/', (req, res) => {
  res.json(mockProfiles);
});

// Get profile by ID
router.get('/:id', (req, res) => {
  const profile = mockProfiles.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json(profile);
});

// Create new profile
router.post('/', (req, res) => {
  const newProfile = {
    ...req.body,
    id: `prof_${Math.random().toString(36).substring(2, 11)}`
  };
  
  // In a real app, would save to database here
  res.status(201).json(newProfile);
});

// Update profile
router.put('/:id', (req, res) => {
  const profile = mockProfiles.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  
  const updatedProfile = { ...profile, ...req.body };
  // In a real app, would update database here
  
  res.json(updatedProfile);
});

// Delete profile
router.delete('/:id', (req, res) => {
  const profile = mockProfiles.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  
  // In a real app, would delete from database here
  res.json({ success: true, message: 'Profile deleted successfully' });
});

module.exports = router;
