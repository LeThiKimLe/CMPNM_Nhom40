/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const { User } = require('../../models');
const {
  Unauthenticated,
  createTokenUser,
  createAccessToken,
  createRefreshToken,
  Unauthorized,
  Response,
} = require('../../utils');
/**
 * * ENDPOINT -- http://api/admin/signin
 * * SUPPORTED PARAMETERS -- email, password
 * * DESCRIPTION -- admin signin
 */
// const oneDay = 60 * 60 * 24;
const signin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email }).exec();
  if (!admin) return Unauthenticated(res, 'Email is not registered account');
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return Unauthenticated(res, 'Password is not correct');
  }
  if (!admin.isVerified) {
    return Unauthenticated(res, 'Account is not verified');
  }
  if (admin.roles !== 'admin') {
    return Unauthorized(res, 'Account is not admin account');
  }
  const adminData = createTokenUser(admin);

  const accessToken = createAccessToken(adminData);
  const newRefreshToken = createRefreshToken(adminData);
  // Saving refreshToken with current user
  admin.refreshToken = newRefreshToken;
  await admin.save();
  // Creates Secure Cookie with refresh token

  return Response(res, {
    adminData,
    accessToken,
  });
};

module.exports = {
  signin,
};
