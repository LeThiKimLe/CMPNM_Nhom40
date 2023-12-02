const express = require('express');

const router = express.Router();
const {
  signin,
  createUser,
  getAllUser,
  deleteUser,
  getUserById,
} = require('../../controllers/admin/admin.controller');
const {
  getAllOrder,
  getOrder,
  updateOrderStatus,

  getMonthlyRevenue,
} = require('../../controllers/order/order.controller');

const {
  reSendRefreshToken,
  uploadImage,
} = require('../../controllers/user/user.controller');

const { authenticateAdmin, adminCheckRole } = require('../../middlewares');

router.post('/signin', signin);
router.post('/refresh-token', reSendRefreshToken);
router.use(authenticateAdmin, adminCheckRole);
router.get('/get-revenue', getMonthlyRevenue);

router.post('/create-user', createUser);
router.get('/get-users', getAllUser);

router.get('/get-user/:id', getUserById);
router.post('/delete-users', deleteUser);
router.get('/get-all-order', getAllOrder);
router.get('/get-order/:id', getOrder);
router.post('/update-order-status', updateOrderStatus);

// upload image in create user
// * /admin/user/upload-image
router.post('/upload-image', uploadImage);
module.exports = router;
