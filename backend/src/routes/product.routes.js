const express = require('express');

const router = express.Router();
const {
  createProduct,
  getAll,
  deleteProduct,
  getProductById,
  getAllAfterHandle,
} = require('../controllers/product/product.controller');
const { adminCheckRole, authenticateAdmin } = require('../middlewares');

router.use(authenticateAdmin, adminCheckRole);
router.get('/get-all-handle', getAllAfterHandle);
router.post('/create', createProduct);
router.get('/:id', getProductById);
router.get('/', getAll);

router.post('/delete', deleteProduct);

module.exports = router;
