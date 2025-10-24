const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');
const { calculatePrice, PRICING } = require('../config/pricing');
const { validateHouseConfig, getDisabledOptions } = require('../config/validationRules');

// Get pricing information
router.get('/pricing', (req, res) => {
  res.json({ pricing: PRICING });
});

// Calculate price for house options
router.post('/calculate-price', (req, res) => {
  try {
    const price = calculatePrice(req.body);
    res.json({ price });
  } catch (error) {
    console.error('Price calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate price' });
  }
});

// Validate house configuration endpoint
router.post('/validate', (req, res) => {
  try {
    const validation = validateHouseConfig(req.body);
    res.json(validation);
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ error: 'Failed to validate configuration' });
  }
});

// Get disabled options based on current selections
router.post('/disabled-options', (req, res) => {
  try {
    const disabledOptions = getDisabledOptions(req.body);
    res.json({ disabledOptions });
  } catch (error) {
    console.error('Get disabled options error:', error);
    res.status(500).json({ error: 'Failed to get disabled options' });
  }
});

// Get all houses for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM custom_houses WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json({ houses: result.rows });
  } catch (error) {
    console.error('Get houses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single house by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM custom_houses WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'House not found' });
    }

    res.json({ house: result.rows[0] });
  } catch (error) {
    console.error('Get house error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new custom house
router.post('/',
  authMiddleware,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('location').trim().notEmpty().withMessage('Location is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Validate configuration
      const validation = validateHouseConfig(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: 'Invalid house configuration',
          validationErrors: validation.errors,
          warnings: validation.warnings
        });
      }

      // Calculate price
      const calculatedPrice = calculatePrice(req.body);

      const {
        name, location, style, bedrooms, bathrooms, square_feet,
        exterior_color, roof_type, flooring_type, kitchen_style,
        has_pool, has_garage, garage_spaces, has_deck, has_fireplace,
        landscape_type, image_url, notes
      } = req.body;

      const result = await db.query(
        `INSERT INTO custom_houses (
          user_id, name, location, style, bedrooms, bathrooms, square_feet,
          exterior_color, roof_type, flooring_type, kitchen_style,
          has_pool, has_garage, garage_spaces, has_deck, has_fireplace,
          landscape_type, price_estimate, image_url, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING *`,
        [
          req.user.userId, name, location, style, bedrooms, bathrooms, square_feet,
          exterior_color, roof_type, flooring_type, kitchen_style,
          has_pool, has_garage, garage_spaces, has_deck, has_fireplace,
          landscape_type, calculatedPrice, image_url, notes
        ]
      );

      res.status(201).json({
        message: 'House created successfully',
        house: result.rows[0]
      });
    } catch (error) {
      console.error('Create house error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update a house
router.put('/:id',
  authMiddleware,
  [
    body('name').optional().trim().notEmpty(),
    body('location').optional().trim().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      const checkResult = await db.query(
        'SELECT * FROM custom_houses WHERE id = $1 AND user_id = $2',
        [id, req.user.userId]
      );

      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'House not found' });
      }

      const {
        name, location, style, bedrooms, bathrooms, square_feet,
        exterior_color, roof_type, flooring_type, kitchen_style,
        has_pool, has_garage, garage_spaces, has_deck, has_fireplace,
        landscape_type, price_estimate, image_url, notes
      } = req.body;

      const result = await db.query(
        `UPDATE custom_houses SET
          name = COALESCE($1, name),
          location = COALESCE($2, location),
          style = COALESCE($3, style),
          bedrooms = COALESCE($4, bedrooms),
          bathrooms = COALESCE($5, bathrooms),
          square_feet = COALESCE($6, square_feet),
          exterior_color = COALESCE($7, exterior_color),
          roof_type = COALESCE($8, roof_type),
          flooring_type = COALESCE($9, flooring_type),
          kitchen_style = COALESCE($10, kitchen_style),
          has_pool = COALESCE($11, has_pool),
          has_garage = COALESCE($12, has_garage),
          garage_spaces = COALESCE($13, garage_spaces),
          has_deck = COALESCE($14, has_deck),
          has_fireplace = COALESCE($15, has_fireplace),
          landscape_type = COALESCE($16, landscape_type),
          price_estimate = COALESCE($17, price_estimate),
          image_url = COALESCE($18, image_url),
          notes = COALESCE($19, notes)
        WHERE id = $20 AND user_id = $21
        RETURNING *`,
        [
          name, location, style, bedrooms, bathrooms, square_feet,
          exterior_color, roof_type, flooring_type, kitchen_style,
          has_pool, has_garage, garage_spaces, has_deck, has_fireplace,
          landscape_type, price_estimate, image_url, notes,
          id, req.user.userId
        ]
      );

      res.json({
        message: 'House updated successfully',
        house: result.rows[0]
      });
    } catch (error) {
      console.error('Update house error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Delete a house
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'DELETE FROM custom_houses WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'House not found' });
    }

    res.json({ message: 'House deleted successfully' });
  } catch (error) {
    console.error('Delete house error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;