/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable consistent-return */

const { User, Category, Order, UserAddress } = require('../../models');
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
const origin = `http://localhost:3001/`;
const signin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email }).exec();
  if (!admin)
    return Unauthenticated(res, 'Địa chỉ email chưa được đăng ký tài khoản');
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return Unauthenticated(res, 'Mật khẩu không đứng!');
  }
  if (!admin.isVerified) {
    return Unauthenticated(res, 'Tài khoản chưa được kích hoạt!');
  }
  if (admin.roles !== 'admin') {
    return Unauthorized(
      res,
      'Tài khoản không phải tài khoản của quản trị viên!'
    );
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
  const { email } = req.body.data;
  let urlImage = '';
  if (req.body.data.picture) {
    const uploadResponse = await cloudinary.uploader.upload(
      req.body.data.picture,
      {
        folder: 'Images/User',
        resource_type: 'auto',
      }
    );
    urlImage = uploadResponse.url;
  }

  User.findOne({ email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (user) return BadRequest(res, 'Địa chỉ email đã được đăng ký');

    let newUser;

    // eslint-disable-next-line prefer-const
    newUser = new User({
      ...req.body.data,
      profilePicture: urlImage,
      isVerified: true,
    });

    // eslint-disable-next-line no-shadow,
    newUser.save(async (error, user) => {
      if (error) return ServerError(res, error.message);
      if (user) {
        return Create(res, 'Tạo tài khoản thành công!');
      }
    });
  });
};
const getUserById = async (req, res) => {
  console.log(req);
  const { id } = req.params;
  const user = await User.findById(id).select(
    '_id firstName lastName email profilePicture roles contactNumber createdAt'
  );

  if (user) {
    return Response(res, user);
  }
  return BadRequest(res, 'User not found');
};
const getAllUser = async (req, res) => {
  let listUser = [];

  try {
    listUser = await User.find({}).select(
      '_id firstName lastName email roles createdAt isVerified contactNumber profilePicture'
    );
    if (listUser.length === 1) {
      Response(res, { list: [] });
    } else {
      // remove account admin

      return Response(res, { list: listUser });
    }
  } catch (error) {
    ServerError(res);
  }
};

const deleteUser = (req, res) => {
  const listID = req.body.data;
  User.deleteMany(
    {
      _id: {
        $in: listID,
      },
    },
    (error, result) => {
      if (error) {
        if (error) return ServerError(res, error.message);
      } else {
        return Response(res, 'Delete successfully');
      }
    }
  );
};

module.exports = {
  signin,
  createUser,
  getAllUser,
  deleteUser,
  getUserById,
};
