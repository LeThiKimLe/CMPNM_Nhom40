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
const { User, Category, Product, Color, Banner } = require('../../models');
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
const redisClient = require('../../connections/cachingRedis');
// time expire token send email
const oneDay = 60 * 60 * 24;

const signup = (req, res) => {
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
  if (!user) {
    return BadRequest(res, 'Email chưa được đăng ký tài khoản');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return BadRequest(res, 'Vui lòng xem lại mật khẩu');
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

  Response(res, {
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
      const now = new Date(Date.now()).getTime();

      if (user.verifyDate.getTime() < now) {
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
  User.findOne({ email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (!user) return NotFound(res, 'Tài khoản');
    const verificationToken = crypto.randomBytes(40).toString('hex');
    const newUser = await User.findOne({ email });

    newUser.verifyDate = new Date(Date.now() + oneDay);
    newUser.verificationToken = verificationToken;
    newUser.save(async (error, data) => {
      if (error) return ServerError(res, error.message);
      if (data) {
        await sendVerificationEmail({
          firstName: newUser.firstName,
          email,
          verificationToken,
        });
        return Response(res, 'Success! check email to verify account');
      }
    });
  });
};
// change password
const changePassword = async (req, res) => {
  const { password, newPassword } = req.body.data;
  const user = await User.findOne({ email: req.user.email });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return BadRequest(res, 'Vui lòng xem lại mật khẩu');
  }
  user
    .updatePassword(newPassword)
    .then((value) => {
      Response(res, 'Success! Password updated successfully');
    })
    .catch((error) => {
      ServerError(res);
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
    'email firstName lastName contactNumber profilePicture'
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
  console.log('userid', userId);
  const foundUser = await User.findById(userId);
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

const getAllData = async (req, res) => {
  let listCategory = [];
  let listBanner = [];
  let listProduct = [];
  let listColor = [];
  try {
    const cachedListCategory = await redisClient.get('categories');
    const cachedListBanner = await redisClient.get('banners');
    const cachedListProduct = await redisClient.get('products');
    const cachedListColor = await redisClient.get('colors');
    if (cachedListCategory) {
      listCategory = JSON.parse(cachedListCategory);
    } else {
      listCategory = await Category.find({}).select(
        '_id name slug isActive level parentId'
      );
      await redisClient.set('categories', JSON.stringify(listCategory));
    }
    if (cachedListBanner) {
      listBanner = JSON.parse(cachedListBanner);
    } else {
      listBanner = await Banner.find({});
      await redisClient.set('banners', JSON.stringify(listBanner));
    }
    if (cachedListProduct) {
      isCached = true;
      listProduct = JSON.parse(cachedListProduct);
    } else {
      listProduct = await Product.find({}).select(
        '_id name slug regularPrice salePrice color stock productPictures category active createdAt detailsProduct sale description quantitySold'
      );
      await redisClient.set('products', JSON.stringify(listProduct));
    }

    if (cachedListColor) {
      listColor = JSON.parse(cachedListColor);
    } else {
      listColor = await Color.find({});
      await redisClient.set('colors', JSON.stringify(listColor));
    }
    Response(res, {
      list: [listCategory, listProduct, listColor, listBanner],
    });
  } catch (error) {
    ServerError(res);
  }
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
  changePassword,
};
