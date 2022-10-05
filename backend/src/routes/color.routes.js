const express = require('express');
const {
  getAllColorByCategory,
  addColor,
} = require('../controllers/color/color.controller');

const router = express.Router();

router.get('/get-colors/:id', getAllColorByCategory);
router.post('/add-color', addColor);
module.exports = router;
