const express = require('express');

const router = express.Router();
const {
  createProduct,
  getAll,
  deleteProduct,
  getAllAfterHandle,
} = require('../controllers/product/product.controller');
const { adminCheckRole, authenticateAdmin } = require('../middlewares');

router.use(authenticateAdmin, adminCheckRole);

router.post('/create', createProduct);
router.get('/', getAll);
router.get('/get-all-handle', getAllAfterHandle);
router.post('/delete', deleteProduct);
module.exports = router;
