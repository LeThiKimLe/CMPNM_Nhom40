const express = require('express');
const { cancelOrder } = require('../controllers/order/order.controller');

const router = express.Router();

const {
  signup,
  verifyEmail,
  reSendVerifyEmail,
  forgotPassword,
  resetPassword,
  uploadImage,
  signin,
  getAllData,
  reSendRefreshToken,
  showProfile,
  changePassword,
  searchProduct,
  getProduct,
  createReview,
  getReview,
  checkToken,
} = require('../controllers/user/user.controller');
const {
  getProductsOption,
} = require('../controllers/product/product.controller');
const { authenticateUser } = require('../middlewares/authenticate');
const { userCheckRole } = require('../middlewares/authorization');

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/refresh-token', reSendRefreshToken);
router.post('/check-token', checkToken);
router.get('/get-all-data', getAllData);
router.post('/verify-email', verifyEmail);
router.post('/resend-verify-email', reSendVerifyEmail);
router.post('/get-products', getProductsOption);
router.get('/search-product', searchProduct);
router.get('/get-product/:categorySlug', getProduct);
router.get('/get-review/:productid', getReview);
router.use(authenticateUser, userCheckRole);

router.post('/create-review', createReview);
router.post('/change-password', changePassword);
router.post('/cancel-order', cancelOrder);
router.get('/get-profile', showProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/upload', uploadImage);
module.exports = router;
