const { Unauthorized } = require('../utils');

// eslint-disable-next-line consistent-return
exports.adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return Unauthorized(res, 'Admin access denied');
  }
  next();
};
