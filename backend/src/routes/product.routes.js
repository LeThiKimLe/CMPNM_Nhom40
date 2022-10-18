const express = require('express');

const router = express.Router();
const {
  createProduct,
  getAll,
} = require('../controllers/product/product.controller');
const { adminCheckRole, authenticateAdmin } = require('../middlewares');

router.use(authenticateAdmin, adminCheckRole);

router.post('/create', createProduct);
router.get('/', getAll);
module.exports = router;
