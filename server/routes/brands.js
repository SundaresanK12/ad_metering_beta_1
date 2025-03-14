
const express = require('express');
const router = express.Router();
const { mockBrands } = require('../data/mockData');

// Get all brands
router.get('/', (req, res) => {
  res.json(mockBrands);
});

// Get brand by ID
router.get('/:id', (req, res) => {
  const brand = mockBrands.find(b => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({ message: 'Brand not found' });
  }
  res.json(brand);
});

// Get offers by brand ID
router.get('/:id/offers', (req, res) => {
  const brand = mockBrands.find(b => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({ message: 'Brand not found' });
  }
  res.json(brand.newOffers);
});

// Create new brand
router.post('/', (req, res) => {
  const newBrand = {
    ...req.body,
    id: `brand_${Math.random().toString(36).substring(2, 11)}`
  };
  
  // In a real app, would save to database here
  res.status(201).json(newBrand);
});

// Update brand
router.put('/:id', (req, res) => {
  const brand = mockBrands.find(b => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({ message: 'Brand not found' });
  }
  
  const updatedBrand = { ...brand, ...req.body };
  // In a real app, would update database here
  
  res.json(updatedBrand);
});

// Delete brand
router.delete('/:id', (req, res) => {
  const brand = mockBrands.find(b => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({ message: 'Brand not found' });
  }
  
  // In a real app, would delete from database here
  res.json({ success: true, message: 'Brand deleted successfully' });
});

module.exports = router;
