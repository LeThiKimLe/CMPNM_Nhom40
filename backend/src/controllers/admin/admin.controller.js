/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const crypto = require('crypto');
const { User, Category, Product, Order, UserAddress } = require('../../models');
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
  sendVerificationEmail,
} = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');
/**
 * * ENDPOINT -- http://api/admin/signin
 * * SUPPORTED PARAMETERS -- email, password
 * * DESCRIPTION -- admin signin
 */
// const oneDay = 60 * 60 * 24;
const fiveMinutes = 60 * 60 * 5;
const origin = `http://localhost:3001/`;
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
    if (user) return BadRequest(res, 'Email already registered');

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
        return Create(res, 'Create user successfully');
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
  const users = await User.find({}).select(
    '_id firstName lastName email roles createdAt isVerified contactNumber profilePicture'
  );
  if (users.length === 1) {
    return Response(res, { list: [] });
  }
  // remove account admin
  users.shift();
  return Response(res, { list: users });
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
const getAllData = async (req, res) => {
  const listUser = await User.find({}).select(
    '_id firstName lastName email roles createdAt isVerified contactNumber profilePicture'
  );
  const listUserAddress = await UserAddress.find({})
    .select('user address')
    .populate('user', '_id');
  const listCategory = await Category.find({ isActive: true }).select(
    '_id name slug isActive level parentId categoryImage createdAt'
  );

  const listProduct = await Product.find({ active: true }).select(
    '_id name slug regularPrice salePrice color stock productPictures category active createdAt detailsProduct sale description'
  );
  const listOrder = await Order.find({})
    .select(
      '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user'
    )
    .populate('items.productId', '_id name productPicture salePrice');

  return Response(res, {
    list: [listUser, listUserAddress, listCategory, listProduct, listOrder],
  });
};
module.exports = {
  signin,
  createUser,
  getAllUser,
  deleteUser,
  getUserById,
  getAllData,
};
