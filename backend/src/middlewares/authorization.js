/* eslint-disable consistent-return */
const { Unauthorized } = require('../utils');

// eslint-disable-next-line consistent-return
const adminCheckRole = (req, res, next) => {
  if (req.user.roles === 'admin') {
    next();
  } else {
    return Unauthorized(res, 'Admin access denied');
  }
};

const userCheckRole = (req, res, next) => {
  if (req.user.roles === 'user') {
    next();
  } else {
    return Unauthorized(res, 'Admin access denied');
  }
};

module.exports = {
  adminCheckRole,
  userCheckRole,
};
