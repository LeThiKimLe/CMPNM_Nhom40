const express = require('express');
const {
  addOrder,
  getAllOrderOfUser,
  getOrder,
  paymentWithMomo,
  checkResponseMomo,
  updateOrderMomoPayment,
  paymentWithPaypal,
  paymentPaypalSuccess,
  addOrderPaypal,
  getAllOrderByStatus,
} = require('../controllers/order/order.controller');
const { authenticateUser } = require('../middlewares/authenticate');
const { userCheckRole } = require('../middlewares/authorization');

const router = express.Router();
router.use(authenticateUser, userCheckRole);
router.post('/add-item', addOrder);
router.post('/add-paypal', addOrderPaypal);
router.get('/get-all', getAllOrderOfUser);
router.get('/get-all-by-status/:status', getAllOrderByStatus);
router.get('/get-order/:id', getOrder);
router.post('/momo', paymentWithMomo);
router.post('/paypal', paymentWithPaypal);
router.get('/success', paymentPaypalSuccess);
router.post('/checkResponse', checkResponseMomo);
router.post('/update-order-momo', updateOrderMomoPayment);
module.exports = router;
