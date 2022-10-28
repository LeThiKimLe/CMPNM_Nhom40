/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User, Category, Product, Color } = require('../../models');
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
  cloudinary,
  createRefreshToken,
  Unauthenticated,
} = require('../../utils');
// time expire token send email
const oneDay = 60 * 60 * 24;

const signup = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (user) return BadRequest(res, 'Email đã được đăng ký tài khoản');
    const userSize = await User.count();
    const { firstName, lastName, email, password } = req.body;
    const verificationToken = crypto.randomBytes(40).toString('hex');
    let newUser;
    const verifyDate = new Date(Date.now() + oneDay);
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

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) return Unauthenticated(res, 'Email chưa được đăng ký tài khoản');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return Unauthenticated(res, 'Vui lòng xem lại mật khẩu');
  }
  if (!user.isVerified) {
    return Unauthenticated(res, 'Tài khoản chưa được kích hoạt');
  }

  const userData = createTokenUser(user);

  const accessToken = createAccessToken(userData);
  const newRefreshToken = createRefreshToken(userData);
  // Saving refreshToken with current user
  user.refreshToken = newRefreshToken;
  await user.save();
  // Creates Secure Cookie with refresh token

  return Response(res, {
    userData,
    accessToken,
  });
};
const verifyEmail = (req, res) => {
  const { email, token } = req.body;

  User.findOne({ email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (!user) return NotFound(res, 'Tài khoản');
    if (user.verificationToken === token) {
      const now = new Date(Date.now());
      console.log(user.verifyDate);
      console.log(now);
      console.log(user.verifyDate < now);
      if (user.verifyDate < now) {
        return BadRequest(res, 'Đường dẫn kích hoạt đã hết hạn!');
      }
      user.isVerified = true;
      user.verified = Date.now();
      user.verificationToken = '';
      user.save(async (error, data) => {
        if (error) return ServerError(res, error.message);
        if (data) {
          return Response(
            res,
            'Thành công! Tài khoản của ban đã được kích hoạt.'
          );
        }
      });
    } else {
      return BadRequest(res, 'Đường dẫn bị lỗi!');
    }
  });
};
// url contain firstName and email
/**
 * todo get email and firstName in link
 * * link ex: http://localhost:3000/api/resend-verify-email?firstName=buitiep&email=buitiep379@gmail.com
 */
const reSendVerifyEmail = async (req, res) => {
  const email = req.body.data;
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const user = await User.findOne({ email });

  user.verifyDate = new Date(Date.now() + oneDay);
  user.verificationToken = verificationToken;
  user.save(async (error, data) => {
    if (error) return ServerError(res, error.message);
    if (data) {
      await sendVerificationEmail({
        firstName: user.firstName,
        email,
        verificationToken,
      });
      return Response(res, 'Success! check email to verify account');
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
  const passwordTokenExpirationDate = new Date(Date.now() + oneDay);
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
  const picture = req.body.data;

  try {
    const uploadResponse = await cloudinary.uploader.upload(picture, {
      folder: 'Images/User',
      resource_type: 'auto',
    });
    return Response(res, { url: uploadResponse.url });
  } catch (error) {
    return ServerError(res, error.message);
  }
};
const reSendRefreshToken = async (req, res) => {
  const { userId } = req.body;
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
        const refreshToken = createRefreshToken(adminData);
        foundUser.refreshToken = refreshToken;
        foundUser.save(async (error, data) => {
          if (error) return ServerError(res, error.message);
          if (data) {
            return Response(res, {
              adminData,
              accessToken,
            });
          }
        });
      }
    );
  }
};
const getDetailsProduct = (listDetail, id) => {
  let details;
  listDetail.map((item) => {
    if (item._id === id) {
      details = item;
    }
  });
  return details;
};
const getAllData = async (req, res) => {
  const listCategory = await Category.find({ isActive: true }).select(
    '_id name slug isActive level parentId'
  );

  const listProduct = await Product.find({ active: true }).select(
    '_id name slug regularPrice salePrice color stock productPictures category active createdAt detailsProduct sale'
  );
  const listColor = await Color.find({});
  return Response(res, { list: [listCategory, listProduct, listColor] });
};
module.exports = {
  signup,
  signin,
  verifyEmail,
  reSendVerifyEmail,
  forgotPassword,
  resetPassword,
  showProfile,
  uploadImage,
  reSendRefreshToken,
  getAllData,
};
