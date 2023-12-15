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
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {
  User,
  Category,
  Product,
  Color,
  Banner,
  Review,
} = require('../../models');
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
    return BadRequest(res, 'Please review your password');
  }
  if (!user.isVerified) {
    return Unauthenticated(res, 'Account has not been activated');
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
const checkToken = async (req, res) => {
  const tokenData = req.body.data;
  const { userId, accessToken } = tokenData;
  try {
    await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return Response(res, { accessToken, allow: true });
  } catch (error) {
    try {
      const foundUser = await User.findById(userId);
      if (foundUser) {
        jwt.verify(
          foundUser.refreshToken,
          process.env.FRESH_TOKEN_SECRET,
          // eslint-disable-next-line no-unused-vars
          async (err, decoded) => {
            // return new access-token
            const adminData = createTokenUser(foundUser);
            const accessToken = createAccessToken(adminData);
            const refreshToken = createRefreshToken(adminData);
            foundUser.refreshToken = refreshToken;

            foundUser.save(async (error, data) => {
              if (error) return ServerError(res, error.message);
              if (data) {
                return Response(res, {
                  accessToken,
                  allow: true,
                });
              }
            });
            if (err) {
              return Response(res, {
                allow: false,
              });
            }
          }
        );
      }
    } catch {
      return res
        .status(401)
        .json({ message: 'Invalid access token or refresh token' });
    }
  }
};
const verifyEmail = (req, res) => {
  const { email, token } = req.body;

  User.findOne({ email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (!user) return NotFound(res, 'Tài khoản');
    if (user.verificationToken === token) {
      const now = new Date(Date.now()).getTime();

      if (user.verifyDate.getTime() < now) {
        return BadRequest(res, 'Activation link has expired!');
      }
      user.isVerified = true;
      user.verified = Date.now();
      user.verificationToken = '';
      user.save(async (error, data) => {
        if (error) return ServerError(res, error.message);
        if (data) {
          return Response(
            res,
            'Success! Your account has been activated.'
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
    if (!user) return NotFound(res, 'Account');
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
    return BadRequest(res, 'Please review your password');
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
  console.log(req.body);
  const userId = req.body.data;
  const foundUser = await User.findById(userId);
  console.log(foundUser);
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
              accessToken,
            });
          }
        });
      }
    );
  }
};
// route
const getProduct = async (req, res) => {
  const { categoryId } = req.params;
  const id = mongoose.Types.ObjectId(categoryId);
  const products = await Product.aggregate([
    {
      $match: {
        active: true,
        $expr: {
          $eq: [
            id,
            { $arrayElemAt: ['$category_path', -1] }
          ]
        }
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        regularPrice: 1,
        detailsProduct: 1,
        productPictures: 1,
        description: 1,
        sale: 1,
        stock: 1,
        salePrice: 1,
        ram: 1,
        storage: 1,
        color: 1, // Include the color field in the project stage
        category_path: 1,
      },
    },
    {
      $group: {
        _id: {
          category_path: '$category_path',
          ram: '$ram',
          storage: '$storage',
        },
        products: { $push: '$$ROOT' },
        colors: { $addToSet: '$color' }, // Accumulate unique colors within the group
      },
    },
    {
      $group: {
        _id: '$_id.category_path',
        groups: {
          $push: {
            _id: {
              ram: '$_id.ram',
              storage: '$_id.storage',
            },
            items: '$products',
            colors: '$colors', // Include the colors field in the result
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category_path: '$_id',
        groups: 1,
      },
    },
  ]);
  return Response(res, { products: products[0].groups });
};
const getAllData = async (req, res) => {
  try {
    const listCategory = await Category.find({}).lean().exec();
    const listBanner = await Banner.find({}).lean().exec();
    const products = await Product.aggregate([
      {
        $match: {
          active: true,
          category_path: { $exists: true, $ne: [] },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
          regularPrice: 1,
          detailsProduct: 1,
          productPictures: 1,
          sale: 1,
          salePrice: 1,
          ram: 1,
          storage: 1,
          category_path: { $arrayElemAt: ['$category_path', -1] },
          category_slug: 1,
        },
      },
      {
        $lookup: {
          from: 'categories', // Assuming the collection name is 'categories'
          localField: 'category_path',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: {
            category_path: '$category_path',
            ram: '$ram',
            storage: '$storage',
          },
          products: { $push: '$$ROOT' },
          category_slug: { $first: '$category.slug' },
        },
      },
      {
        $group: {
          _id: '$_id.category_path',
          groups: {
            $push: {
              _id: {
                ram: '$_id.ram',
                storage: '$_id.storage',
              },
              items: '$products',
              category_slug: '$category_slug',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category_path: '$_id',
          groups: 1,
        },
      },
    ]);

    return Response(res, {
      list: [listCategory, products, listBanner],
    });
  } catch (error) {
    ServerError(res);
  }
};

const createReview = async (req, res) => {
  try {
    const reviewData = req.body.data;
    let reviewPicturesUpload = [];
    let reviewPictures = [];
    reviewData.user = req.user.userId;

    if (reviewData.listImage) {
      reviewPicturesUpload = await Promise.all(
        reviewData.listImage.map(async (image) => {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: `Images/Review`,
            resource_type: 'auto',
          });
          return uploadResponse;
        })
      );
      reviewPictures = reviewPicturesUpload.map((upload) => upload.url);
      reviewData.images = reviewPictures;
    }
    const newReview = new Review(reviewData);
    await newReview.save();
    Response(res);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
const searchProduct = async (req, res) => {
  const { phrase } = req.query;
  try {
    const products = await Product.aggregate([
      {
        $match: {
          name: { $regex: phrase, $options: 'i' },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
          regularPrice: 1,
          detailsProduct: 1,
          productPictures: 1,
          sale: 1,
          salePrice: 1,
          ram: 1,
          storage: 1,
          category_path: { $arrayElemAt: ['$category_path', -1] },
          category_slug: 1,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category_path',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: {
            category_path: '$category_path',
            ram: '$ram',
            storage: '$storage',
          },
          products: { $push: '$$ROOT' },
          category_slug: { $first: '$category.slug' },
        },
      },
      {
        $group: {
          _id: '$_id.category_path',
          groups: {
            $push: {
              _id: {
                ram: '$_id.ram',
                storage: '$_id.storage',
              },
              items: '$products',
              category_slug: '$category_slug',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category_path: '$_id',
          groups: 1,
        },
      },
    ]);
    console.log("product search", products);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getReview = async (req, res) => {
  const { productid } = req.params;
  console.log(productid);
  const reviews = await Review.find({
    product: mongoose.Types.ObjectId(productid),
  }).populate('user', '_id firstName lastName');
  const images = reviews.map((review) => review.images).flat();
  const reviewCount = reviews.length;
  console.log(reviewCount);
  const ratingCount = [0, 0, 0, 0, 0];
  let ratingTotal = 0;
  reviews.map((item) => {
    const { rating } = item;
    ratingTotal += rating;
    ratingCount[rating - 1] = ratingCount[rating - 1] + 1;
  });
  const averageRating = ratingTotal / reviewCount;
  const ratingPercentage = ratingCount.map(
    (count) => (count / reviewCount) * 100
  );
  console.log(reviewCount, averageRating, ratingCount);
  Response(res, {
    reviews,
    reviewCount,
    averageRating,
    ratingPercentage,
    images,
  });
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
  searchProduct,
  getProduct,
  createReview,
  getReview,
  checkToken,
};
