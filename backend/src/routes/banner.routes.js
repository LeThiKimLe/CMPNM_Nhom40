const express = require('express');
const {
  createBanner,
  getAllBanner,
} = require('../controllers/banner/banner.controller');
const { authenticateAdmin, adminCheckRole } = require('../middlewares');

const router = express.Router();
router.use(authenticateAdmin, adminCheckRole);
router.post('/create', createBanner);
router.get('/', getAllBanner);
module.exports = router;
