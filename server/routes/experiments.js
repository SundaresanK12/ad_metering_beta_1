
const express = require('express');
const router = express.Router();
const { mockExperiments } = require('../data/mockData');

// Get all experiments
router.get('/', (req, res) => {
  res.json(mockExperiments);
});

// Get experiment by ID
router.get('/:id', (req, res) => {
  const experiment = mockExperiments.find(e => e.id === req.params.id);
  if (!experiment) {
    return res.status(404).json({ message: 'Experiment not found' });
  }
  res.json(experiment);
});

// Get experiments by campaign ID
router.get('/campaign/:campaignId', (req, res) => {
  const experiments = mockExperiments.filter(e => e.campaignId === req.params.campaignId);
  res.json(experiments);
});

// Create new experiment
router.post('/', (req, res) => {
  const newExperiment = {
    ...req.body,
    id: `exp_${Math.random().toString(36).substring(2, 11)}`
  };
  
  // In a real app, would save to database here
  res.status(201).json(newExperiment);
});

// Update experiment
router.put('/:id', (req, res) => {
  const experiment = mockExperiments.find(e => e.id === req.params.id);
  if (!experiment) {
    return res.status(404).json({ message: 'Experiment not found' });
  }
  
  const updatedExperiment = { ...experiment, ...req.body };
  // In a real app, would update database here
  
  res.json(updatedExperiment);
});

// Delete experiment
router.delete('/:id', (req, res) => {
  const experiment = mockExperiments.find(e => e.id === req.params.id);
  if (!experiment) {
    return res.status(404).json({ message: 'Experiment not found' });
  }
  
  // In a real app, would delete from database here
  res.json({ success: true, message: 'Experiment deleted successfully' });
});

module.exports = router;
