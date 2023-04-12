const express = require('express');

const router = express.Router();
const {
  signin,
  createUser,
  getAllUser,
  deleteUser,
  getUserById,
  getAllData,
  getAllUserAfterHandle,
} = require('../../controllers/admin/admin.controller');
const {
  getAllOrder,
  getOrder,
  updateOrderStatus,
  getAllOrderAfterHandle,
} = require('../../controllers/order/order.controller');
const { updateAll } = require('../../controllers/product/product.controller');
const {
  reSendRefreshToken,
  uploadImage,
} = require('../../controllers/user/user.controller');

const { authenticateAdmin, adminCheckRole } = require('../../middlewares');

router.post('/signin', signin);
router.post('/refresh-token', reSendRefreshToken);
router.use(authenticateAdmin, adminCheckRole);
router.post('/update-all', updateAll);
router.get('/get-all-data', getAllData);
router.post('/create-user', createUser);
router.get('/get-users', getAllUser);
router.get('/get-all-user-handle', getAllUserAfterHandle);
router.get('/get-user/:id', getUserById);
router.post('/delete-users', deleteUser);
router.get('/get-all-order', getAllOrder);
router.get('/get-order/:id', getOrder);
router.post('/update-order-status', updateOrderStatus);
router.get('/get-all-order-handle', getAllOrderAfterHandle);
// upload image in create user
// * /admin/user/upload-image
router.post('/upload-image', uploadImage);
module.exports = router;
