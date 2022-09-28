const express = require('express');

const router = express.Router();
const {
  signin,
  createUser,
} = require('../../controllers/admin/admin.controller');
const {
  reSendRefreshToken,
  uploadImage,
} = require('../../controllers/user/user.controller');

const { authenticateAdmin, adminCheckRole } = require('../../middlewares');

router.post('/signin', signin);
router.post('/refresh-token', reSendRefreshToken);

router.use(authenticateAdmin, adminCheckRole);
router.post('/create-user', createUser);
// upload image in create user
// * /admin/user/upload-image
router.post('/upload-image', uploadImage);
module.exports = router;
