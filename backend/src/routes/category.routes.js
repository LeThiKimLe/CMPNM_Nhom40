const express = require('express');

const router = express.Router();
const {
  create,
  getAll,
  deleteCategory,
} = require('../controllers/category/category.controller');
const { adminCheckRole, authenticateAdmin } = require('../middlewares');

router.use(authenticateAdmin, adminCheckRole);
router.get('/', getAll);
router.post('/create', create);
router.post('/delete', deleteCategory);
module.exports = router;
