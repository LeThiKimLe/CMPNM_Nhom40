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
  ServerError,
  BadRequest,
  Create,
} = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');
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

// create user

const createUser = async (req, res) => {
  const { picture, email } = req.body.data;

  const uploadResponse = await cloudinary.uploader.upload(picture, {
    folder: 'Images/User',
    resource_type: 'auto',
  });
  const { url } = uploadResponse;
  console.log('url ', url);
  User.findOne({ email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (user) return BadRequest(res, 'Email already registered');

    let newUser;
    // eslint-disable-next-line prefer-const
    newUser = new User({
      ...req.body.data,
      profilePicture: url,
      isVerified: true,
    });

    // eslint-disable-next-line no-shadow,
    newUser.save(async (error, user) => {
      if (error) return ServerError(res, error.message);
      if (user) {
        return Create(res, 'Create user successfully');
      }
    });
  });
};
module.exports = {
  signin,
  createUser,
};
