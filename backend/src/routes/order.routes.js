const express = require('express');
const {
  addOrder,
  getAllOrderOfUser,
  getOrder,
  paymentWithMomo,
  checkResponseMomo,
  updateOrderMomoPayment,
} = require('../controllers/order/order.controller');
const { authenticateUser } = require('../middlewares/authenticate');
const { userCheckRole } = require('../middlewares/authorization');

const router = express.Router();
router.use(authenticateUser, userCheckRole);
router.post('/add-item', addOrder);
router.get('/get-all', getAllOrderOfUser);
router.get('/get-order/:id', getOrder);
router.post('/momo', paymentWithMomo);
router.post('/checkResponse', checkResponseMomo);
router.post('/update-order-momo', updateOrderMomoPayment);
module.exports = router;
