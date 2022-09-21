const express = require('express');

const router = express.Router();

const {
  signup,
  verifyEmail,
  reSendVerifyEmail,
  forgotPassword,
  resetPassword,
  uploadImage,
} = require('../controllers/user/user.controller');

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/resend-verify-email', reSendVerifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/upload', uploadImage);
module.exports = router;
