const { authenticateAdmin } = require('./authenticate');
const { adminCheckRole } = require('./authorization');
const credentials = require('./credentials');

module.exports = {
  authenticateAdmin,
  adminCheckRole,
  credentials,
};
