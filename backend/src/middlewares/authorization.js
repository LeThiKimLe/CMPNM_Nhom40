const { Unauthorized } = require('../utils');

// eslint-disable-next-line consistent-return
const adminCheckRole = (req, res, next) => {
  if (req.user.roles !== 'admin') {
    return Unauthorized(res, 'Admin access denied');
  }
  next();
};

module.exports = {
  adminCheckRole,
};
