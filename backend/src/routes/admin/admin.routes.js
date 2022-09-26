const express = require('express');

const router = express.Router();
const { signin } = require('../../controllers/admin/admin.controller');
const {
  showProfile,
  reSendRefreshToken,
  uploadImage,
} = require('../../controllers/user/user.controller');

const { authenticateAdmin } = require('../../middlewares/authenticate');

router.post('/signin', signin);
router.post('/refresh-token', reSendRefreshToken);
router.get('/show-profile', authenticateAdmin, showProfile);
// upload image in create user
// * /admin/user/upload-image
router.post('/user/upload-image', uploadImage);

// router upload image in profile
// * /admin/upload-image
router.post('/upload-image', uploadImage);
module.exports = router;
