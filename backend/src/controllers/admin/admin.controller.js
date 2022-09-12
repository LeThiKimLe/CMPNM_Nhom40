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
const oneDay = 60 * 60 * 24;
const signin = async (req, res) => {
  const { cookies } = req;

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
  if (!admin.isAdmin) {
    return Unauthorized(res, 'Account is not admin account');
  }
  const adminData = createTokenUser(admin);

  const accessToken = createAccessToken(adminData);
  const newRefreshToken = createRefreshToken(adminData);
  // Changed to let keyword
  let newRefreshTokenArray = !cookies?.jwt
    ? admin.refreshToken
    : admin.refreshToken.filter((rt) => rt !== cookies.jwt);
  if (cookies?.jwt) {
    /* 
      Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      */
    const refreshToken = cookies.jwt;
    const foundToken = await User.findOne({ refreshToken });
    // Detected refresh token reuse!
    if (!foundToken) {
      // clear out ALL previous refresh tokens
      newRefreshTokenArray = [];
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });
  }
  // Saving refreshToken with current user
  admin.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await admin.save();
  // Creates Secure Cookie with refresh token
  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'None',
    maxAge: new Date(Date.now() + oneDay),
  });
  return Response(res, {
    adminData,
    accessToken,
  });
};

module.exports = {
  signin,
};
