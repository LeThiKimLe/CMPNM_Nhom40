const express = require('express');

const router = express.Router();
const { signin } = require('../../controllers/admin/admin.controller');

const { authenticateAdmin } = require('../../middlewares/authenticate');
const screenRouter = require('./screen.routes');

router.post('/signin', signin);

router.use('/screens', authenticateAdmin, screenRouter);
module.exports = router;
