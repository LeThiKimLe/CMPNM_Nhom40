/* eslint-disable consistent-return */
/* eslint-disable no-console */
const {
  isTokenValid,
  attachCookiesToResponse,
  Unauthenticated,
} = require('../utils');
const Token = require('../models');

const authenticateAdmin = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  // console.log('accessToken', accessToken, 'refreshToken', refreshToken);
  try {
    if (accessToken) {
      const decoded = isTokenValid(accessToken);
      const {
        user: { fullName, userId },
      } = decoded;
      if (decoded.user.isAdmin) {
        req.user = { fullName, userId, isAdmin: true };
      } else {
        req.user = { fullName, userId, role: decoded.user.role };
      }
      return next();
    }
    const decoded = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: decoded.user.userId,
      refreshToken: decoded.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
      Unauthenticated(res);
    }
    attachCookiesToResponse({ res, user: decoded.user, refreshToken });
    req.user = decoded.user;
    next();
  } catch (error) {
    Unauthenticated(res, error);
  }
};

module.exports = {
  authenticateAdmin,
};
