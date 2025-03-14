
const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { mockBrands } = require('../data/mockData'); // Kept for fallback

// Get all brands
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM brands');
    
    // For each brand, get new offers
    for (let i = 0; i < rows.length; i++) {
      // Get offers
      const [offers] = await pool.query(
        'SELECT * FROM brand_offers WHERE brand_id = ?',
        [rows[i].id]
      );
      
      rows[i].newOffers = offers;
    }
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching brands:', error);
    // Fallback to mock data if database fails
    res.json(mockBrands);
  }
});

// Get brand by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM brands WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    
    // Get offers
    const [offers] = await pool.query(
      'SELECT * FROM brand_offers WHERE brand_id = ?',
      [req.params.id]
    );
    
    // Get features for each offer
    for (let i = 0; i < offers.length; i++) {
      const [features] = await pool.query(
        'SELECT feature FROM brand_offer_features WHERE offer_id = ?',
        [offers[i].id]
      );
      
      offers[i].features = features.map(f => f.feature);
    }
    
    const brand = {
      ...rows[0],
      newOffers: offers
    };
    
    res.json(brand);
  } catch (error) {
    console.error(`Error fetching brand ${req.params.id}:`, error);
    // Fallback to mock data
    const brand = mockBrands.find(b => b.id === req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  }
});

// Get offers by brand ID
router.get('/:id/offers', async (req, res) => {
  try {
    // Get offers
    const [offers] = await pool.query(
      'SELECT * FROM brand_offers WHERE brand_id = ?',
      [req.params.id]
    );
    
    // Get features for each offer
    for (let i = 0; i < offers.length; i++) {
      const [features] = await pool.query(
        'SELECT feature FROM brand_offer_features WHERE offer_id = ?',
        [offers[i].id]
      );
      
      offers[i].features = features.map(f => f.feature);
    }
    
    res.json(offers);
  } catch (error) {
    console.error(`Error fetching offers for brand ${req.params.id}:`, error);
    // Fallback to mock data
    const brand = mockBrands.find(b => b.id === req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand.newOffers);
  }
});

// Create new brand
router.post('/', async (req, res) => {
  try {
    const { name, marketShare, stockPrice, revenueInBillions, customerSatisfaction, yearlyGrowth, newOffers } = req.body;
    
    // Generate ID
    const id = `brand_${Math.random().toString(36).substring(2, 11)}`;
    
    // Insert basic brand data
    await pool.query(
      'INSERT INTO brands (id, name, market_share, stock_price, revenue_in_billions, customer_satisfaction, yearly_growth) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, marketShare, stockPrice, revenueInBillions, customerSatisfaction, yearlyGrowth]
    );
    
    // Insert offers
    if (newOffers && newOffers.length) {
      for (const offer of newOffers) {
        // Generate offer ID
        const offerId = `offer_${Math.random().toString(36).substring(2, 11)}`;
        
        await pool.query(
          'INSERT INTO brand_offers (id, brand_id, name, price) VALUES (?, ?, ?, ?)',
          [offerId, id, offer.name, offer.price]
        );
        
        // Insert features
        if (offer.features && offer.features.length) {
          const featureValues = offer.features.map(feature => [offerId, feature]);
          await pool.query(
            'INSERT INTO brand_offer_features (offer_id, feature) VALUES ?',
            [featureValues]
          );
        }
      }
    }
    
    // Return newly created brand
    res.status(201).json({ 
      id, 
      name, 
      marketShare, 
      stockPrice, 
      revenueInBillions, 
      customerSatisfaction, 
      yearlyGrowth, 
      newOffers: newOffers || []
    });
    
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ message: 'Failed to create brand', error: error.message });
  }
});

// Update brand
router.put('/:id', async (req, res) => {
  try {
    const { name, marketShare, stockPrice, revenueInBillions, customerSatisfaction, yearlyGrowth, newOffers } = req.body;
    const brandId = req.params.id;
    
    // Check if brand exists
    const [existingBrand] = await pool.query('SELECT * FROM brands WHERE id = ?', [brandId]);
    if (existingBrand.length === 0) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    
    // Update base brand
    await pool.query(
      'UPDATE brands SET name = ?, market_share = ?, stock_price = ?, revenue_in_billions = ?, customer_satisfaction = ?, yearly_growth = ? WHERE id = ?',
      [name, marketShare, stockPrice, revenueInBillions, customerSatisfaction, yearlyGrowth, brandId]
    );
    
    // Update offers (delete and reinsert)
    if (newOffers) {
      // Get existing offers
      const [existingOffers] = await pool.query('SELECT id FROM brand_offers WHERE brand_id = ?', [brandId]);
      
      // Delete offer features
      for (const offer of existingOffers) {
        await pool.query('DELETE FROM brand_offer_features WHERE offer_id = ?', [offer.id]);
      }
      
      // Delete offers
      await pool.query('DELETE FROM brand_offers WHERE brand_id = ?', [brandId]);
      
      // Insert new offers
      if (newOffers.length) {
        for (const offer of newOffers) {
          // Generate offer ID
          const offerId = `offer_${Math.random().toString(36).substring(2, 11)}`;
          
          await pool.query(
            'INSERT INTO brand_offers (id, brand_id, name, price) VALUES (?, ?, ?, ?)',
            [offerId, brandId, offer.name, offer.price]
          );
          
          // Insert features
          if (offer.features && offer.features.length) {
            const featureValues = offer.features.map(feature => [offerId, feature]);
            await pool.query(
              'INSERT INTO brand_offer_features (offer_id, feature) VALUES ?',
              [featureValues]
            );
          }
        }
      }
    }
    
    // Get updated brand to return
    const [rows] = await pool.query('SELECT * FROM brands WHERE id = ?', [brandId]);
    res.json({ 
      ...rows[0], 
      newOffers: newOffers || []
    });
    
  } catch (error) {
    console.error(`Error updating brand ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update brand', error: error.message });
  }
});

// Delete brand
router.delete('/:id', async (req, res) => {
  try {
    const brandId = req.params.id;
    
    // Check if brand exists
    const [existingBrand] = await pool.query('SELECT * FROM brands WHERE id = ?', [brandId]);
    if (existingBrand.length === 0) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    
    // Get existing offers
    const [existingOffers] = await pool.query('SELECT id FROM brand_offers WHERE brand_id = ?', [brandId]);
    
    // Delete offer features
    for (const offer of existingOffers) {
      await pool.query('DELETE FROM brand_offer_features WHERE offer_id = ?', [offer.id]);
    }
    
    // Delete offers
    await pool.query('DELETE FROM brand_offers WHERE brand_id = ?', [brandId]);
    
    // Delete the brand
    await pool.query('DELETE FROM brands WHERE id = ?', [brandId]);
    
    res.json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    console.error(`Error deleting brand ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete brand', error: error.message });
  }
});

module.exports = router;
