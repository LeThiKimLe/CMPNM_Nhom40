/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const crypto = require('crypto');
const { User, Token } = require('../../models');
const {
  ServerError,
  BadRequest,
  Unauthenticated,
  Response,
  createTokenUser,
  attachCookiesToResponse,
} = require('../../utils');
/**
 * * ENDPOINT -- http://api/admin/signin
 * * SUPPORTED PARAMETERS -- email, password
 * * DESCRIPTION -- admin signin
 */

const signin = async (req, res) => {
  // find user
  User.findOne({ email: req.body.email }).exec(async (error, admin) => {
    if (error) return ServerError(res, error.message);
    if (!admin) return BadRequest(res, 'Admin does not exist');

    const isAuthen = await admin.authenticate(req.body.password);
    if (!isAuthen) return BadRequest(res, 'Wrong password');

    if (!admin.isAdmin) {
      return Unauthenticated(res);
    }
    if (!admin.isVerified) {
      return Unauthenticated(res, 'Account is not verified');
    }
    const tokenUser = createTokenUser(admin);
    // create refreshToken
    let refreshToken = '';
    // check token
    const existingToken = await Token.findOne({ user: admin._id });
    if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
        return Unauthenticated(res);
      }
      refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: tokenUser, refreshToken });
      return Response(res, {
        user: tokenUser,
      });
    }
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const { ip } = req;
    const userToken = { refreshToken, ip, userAgent, user: admin._id };
    await Token.create(userToken);
    attachCookiesToResponse({ res, admin: tokenUser, refreshToken });
    return Response(res, {
      user: tokenUser,
    });
  });
};
module.exports = {
  signin,
};
