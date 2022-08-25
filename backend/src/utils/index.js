const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
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
const logger = require('./logger');
const sendVerificationEmail = require('./send_mail/send-verification-email');
const sendResetPasswordEmail = require('./send_mail/send-reset-password');
const createTokenUser = require('./token/create-token-data');
const createHash = require('./createHash');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
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
  logger,
  sendVerificationEmail,
  createTokenUser,
  sendResetPasswordEmail,
  createHash,
};
