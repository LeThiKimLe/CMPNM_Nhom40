const express = require('express');

const router = express.Router();
const { signin } = require('../../controllers/admin/admin.controller');
const { showProfile } = require('../../controllers/user/user.controller');

const { authenticateAdmin } = require('../../middlewares/authenticate');

router.post('/signin', signin);
router.use('/show-profile', authenticateAdmin, showProfile);
module.exports = router;
