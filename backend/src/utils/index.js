const {
  createJWT,
  isTokenValid,
  createAccessToken,
  createRefreshToken,
} = require('./token/jwt');
const {
  Response,
  Get,
  Create,
  Update,
  Delete,
  BadRequest,
  Unauthenticated,
  Unauthorized,
  NotFound,
  ServerError,
  JWTExpiredError,
} = require('./response');
const sendVerificationEmail = require('./send_mail/send-verification-email');
const sendResetPasswordEmail = require('./send_mail/send-reset-password');
const createTokenUser = require('./token/create-token-data');
const createHash = require('./create-hash');

module.exports = {
  createJWT,
  isTokenValid,
  createAccessToken,
  createRefreshToken,
  Response,
  Get,
  Create,
  Update,
  Delete,
  BadRequest,
  Unauthenticated,
  Unauthorized,
  NotFound,
  ServerError,
  JWTExpiredError,
  sendVerificationEmail,
  createTokenUser,
  sendResetPasswordEmail,
  createHash,
};
