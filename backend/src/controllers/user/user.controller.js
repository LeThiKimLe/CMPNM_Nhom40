/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const {
  ServerError,
  BadRequest,
  Response,
  sendVerificationEmail,
  Create,
  NotFound,
  sendResetPasswordEmail,
  createHash,
  Unauthorized,
  createTokenUser,
  createAccessToken,
} = require('../../utils');
// time expire token send email
const fiveMinutes = 60 * 60 * 5;
const origin = `http://localhost:3000/api`;
const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (user) return BadRequest(res, 'User already registered');
    const userSize = await User.count();
    const { firstName, lastName, email, password } = req.body;
    const verificationToken = crypto.randomBytes(40).toString('hex');
    let newUser;
    const verifyDate = new Date(Date.now() + fiveMinutes);
    // eslint-disable-next-line prefer-const
    newUser = new User({
      firstName,
      lastName,
      email,
      password,
      verificationToken,
      verifyDate,
    });

    if (userSize === 0) {
      newUser.roles = 'admin';
    }
    // eslint-disable-next-line no-shadow,
    newUser.save(async (error, user) => {
      if (error) return ServerError(res, error.message);
      if (user) {
        await sendVerificationEmail({
          firstName,
          email,
          verificationToken,
          origin,
        });
        // nhận toàn bộ dư liệu của user
        return Create(res, {
          firstName,
          email,
        });
      }
    });
  });
};

const verifyEmail = (req, res) => {
  const { email, token } = req.query;
  User.findOne({ email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (!user) return NotFound(res, 'User');
    if (user.verificationToken === token) {
      if (user.verifyDate > Date.now()) {
        return BadRequest(res, 'Link has expired email verification time');
      }
      user.isVerified = true;
      user.verified = Date.now();
      user.verificationToken = '';
      user.save(async (error, data) => {
        if (error) return ServerError(res, error.message);
        if (data) {
          return Response(res, { message: 'Success! Account is active' });
        }
      });
    } else {
      return BadRequest(res, 'Token does not match verification token');
    }
  });
};
// url contain firstName and email
/**
 * todo get email and firstName in link
 * * link ex: http://localhost:3000/api/resend-verify-email?firstName=buitiep&email=buitiep379@gmail.com
 */
const reSendVerifyEmail = async (req, res) => {
  const { email, firstName } = req.query;
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const user = await User.findOne({ email });
  user.verifyDate = new Date(Date.now() + fiveMinutes);
  user.verificationToken = verificationToken;
  user.save(async (error, data) => {
    if (error) return ServerError(res, error.message);
    if (data) {
      await sendVerificationEmail({
        firstName,
        email,
        verificationToken,
        origin,
      });
      return Response(res, {
        message: 'Success! check email to verify account',
      });
    }
  });
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return BadRequest(res, 'Please provide email!');
  }
  const user = await User.findOne({ email });

  if (!user) return NotFound(res, 'User');
  const passwordToken = crypto.randomBytes(70).toString('hex');
  const passwordTokenExpirationDate = new Date(Date.now() + fiveMinutes);
  await sendResetPasswordEmail({
    firstName: user.firstName,
    email,
    passwordToken,
    origin,
  });
  user.passwordToken = createHash(passwordToken);
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  await user.save();
  return Response(res, {
    message: 'Please check your email for reset password link',
  });
};

// reset password
const resetPassword = async (req, res) => {
  const { passwordToken, email } = req.query;

  if (!passwordToken || !email) {
    return BadRequest(res, 'Please provide all values');
  }

  const user = await User.findOne({ email });
  if (!user) return NotFound(res, 'User');
  const currentDate = new Date();
  if (
    user.passwordToken === createHash(passwordToken) &&
    user.passwordTokenExpirationDate > currentDate
  ) {
    user.password = req.body.password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();
  }
  return Response(res, { message: 'Reset password successfully!' });
};

const showProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select(
    'email firstName lastName contactNumner profilePicture'
  );
  return Response(res, { user });
};

const uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data;
    return res
      .json({
        fileStr,
      })
      .status(200);
  } catch (error) {
    console.log(error);
    return res
      .json({
        error,
      })
      .status(404);
  }
};
const reSendRefreshToken = async (req, res) => {
  const { userId } = req.body;
  console.log('userId', userId);
  const foundUser = await User.findById(userId);
  console.log('foundUser', foundUser);
  if (foundUser) {
    jwt.verify(
      foundUser.refreshToken,
      process.env.FRESH_TOKEN_SECRET,
      // eslint-disable-next-line no-unused-vars
      async (err, decoded) => {
        if (err) return Unauthorized(res); // Forbidden
        // return new access-token
        const adminData = createTokenUser(foundUser);
        const accessToken = createAccessToken(adminData);
        return Response(res, {
          adminData,
          accessToken,
        });
      }
    );
  }
};
module.exports = {
  signup,
  verifyEmail,
  reSendVerifyEmail,
  forgotPassword,
  resetPassword,
  showProfile,
  uploadImage,
  reSendRefreshToken,
};
