const express = require('express');
const {
  addOrder,
  getAllOrder,
  getOrder,
} = require('../controllers/order/order.controller');
const { authenticateUser } = require('../middlewares/authenticate');
const { userCheckRole } = require('../middlewares/authorization');

const router = express.Router();
router.use(authenticateUser, userCheckRole);
router.post('/add-item', addOrder);
router.get('/get-all', getAllOrder);
router.get('/get-order/:id', getOrder);
module.exports = router;