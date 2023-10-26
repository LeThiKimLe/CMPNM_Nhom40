const express = require('express');

const router = express.Router();
const { 
  create,
  getAllColors,
  getColorById,
  update,
  deleteColor,
} = require('../controllers/colors/color.controller');

// Create a new color
router.post('/', create);

// Get all colors
router.get('/', getAllColors);

// Get a color by ID
router.get('/:id', getColorById);

// Update a color by ID
router.put('/:id', update);

// Delete a color by ID
router.delete('/:id', deleteColor);

module.exports = router;

