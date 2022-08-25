const express = require('express');

const router = express.Router();

const {
  signup,
  verifyEmail,
  reSendVerifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/user/user.controller');

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/resend-verify-email', reSendVerifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
module.exports = router;
