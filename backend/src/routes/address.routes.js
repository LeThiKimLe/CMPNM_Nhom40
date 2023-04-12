const express = require('express');
const {
  addAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require('../controllers/address/address.controller');
const { authenticateUser } = require('../middlewares/authenticate');
const { userCheckRole } = require('../middlewares/authorization');

const router = express.Router();
router.use(authenticateUser, userCheckRole);
router.post('/add', addAddress);
router.post('/update', updateAddress);
router.get('/get-all', getAllAddress);
router.post('/delete', deleteAddress);
router.post('/set-default', setDefaultAddress);
module.exports = router;
