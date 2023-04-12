const express = require('express');
const {
  getAllItems,
  addItem,
  addItems,
  deleteCartItem,
  updateCartItem,
} = require('../controllers/cart/cart.controller');
const { authenticateUser } = require('../middlewares/authenticate');
const { userCheckRole } = require('../middlewares/authorization');

const router = express.Router();
router.use(authenticateUser, userCheckRole);
router.get('/get-all-items', getAllItems);
router.post('/add-item', addItem);
router.post('/add-items-local', addItems);
router.post('/delete-item', deleteCartItem);
router.post('/update-cart-item', updateCartItem);
module.exports = router;
