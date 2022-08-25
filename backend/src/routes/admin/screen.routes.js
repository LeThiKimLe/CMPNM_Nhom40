const express = require('express');
const { getAll } = require('../../controllers/admin');

const screenRouter = express.Router();

screenRouter.get('/', getAll);
module.exports = screenRouter;
