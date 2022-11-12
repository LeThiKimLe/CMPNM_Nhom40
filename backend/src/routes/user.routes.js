const express = require('express');

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
} = require('../controllers/user/user.controller');

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/refresh-token', reSendRefreshToken);
router.get('/get-all-data', getAllData);
router.post('/verify-email', verifyEmail);
router.post('/resend-verify-email', reSendVerifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/upload', uploadImage);
module.exports = router;
