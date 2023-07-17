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
const { Client } = require('@elastic/elasticsearch');
const mongoose = require('mongoose');

const client = new Client({
  node: 'http://localhost:9200/',
  auth: {
    username: 'elastic',
    password: 'VP3oN4L+treCsA10=F+I',
  },
});
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

// time expire token send email
const oneDay = 60 * 60 * 24;
async function testConnection() {
  try {
    const response = await client.ping();
    console.log('Elasticsearch is up and running:', response);
  } catch (error) {
    console.error('Error connecting to Elasticsearch:', error);
  }
}
async function indexCategories() {
  try {
    const categories = await Category.find({});
    console.log(categories);
    const body = categories.flatMap((category) => [
      { index: { _index: 'categories', _id: category._id.toString() } },
      {
        name: category.name,
        slug: category.slug,
        parent: category.parent,
        level: category.level,
      },
    ]);

    const { body: bulkResponse } = await client.bulk({ body });
    if (typeof bulkResponse !== 'undefined' && bulkResponse.errors) {
      console.log(`Failed to index some categories in Elasticsearch`);
    } else {
      console.log(`Indexed ${categories.length} categories in Elasticsearch`);
    }

    // Or using optional chaining
    bulkResponse?.errors
      ? console.log(`Failed to index some categories in Elasticsearch`)
      : console.log(`Indexed ${categories.length} categories in Elasticsearch`);
  } catch (error) {
    console.log(error);
  }
}
async function indexProducts() {
  try {
    const products = await Product.find({})
      .populate('category', '_id name slug')
      .populate('createdBy', '_id firstName lastName');

    const body = products.flatMap((product) => [
      { index: { _index: 'products', _id: product._id.toString() } },
      {
        name: product.name,
        slug: product.slug,
        regularPrice: product.regularPrice,
        sale: product.sale,
        salePrice: product.salePrice,
        description: product.description,
        detailsProduct: product.detailsProduct,
        color: product.color,
        quantitySold: product.quantitySold,
        stock: product.stock,
        productPictures: product.productPictures,
        category: {
          _id: product.category._id.toString(),
          name: product.category.name,
          slug: product.category.slug,
        },
        active: product.active,
      },
    ]);

    const { body: bulkResponse } = await client.bulk({ body });
    if (typeof bulkResponse !== 'undefined' && bulkResponse.errors) {
      console.log(`Failed to index some products in Elasticsearch`);
    } else {
      console.log(`Indexed ${products.length} products in Elasticsearch`);
    }
    // Or using optional chaining
    bulkResponse?.errors
      ? console.log(`Failed to index some products in Elasticsearch`)
      : console.log(`Indexed ${products.length} products in Elasticsearch`);
  } catch (error) {
    console.log(error);
  }
}
const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return ServerError(res, error.message);
    if (user) return BadRequest(res, 'Email đã được đăng ký tài khoản');
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
    userId: userData.userId,
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
  const { categorySlug } = req.params;
  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $match: {
        'category.slug': categorySlug,
      },
    },
    {
      $group: {
        _id: {
          ram: '$detailsProduct.ram',
          storage: '$detailsProduct.storage',
        },
        colors: {
          $push: '$color',
        },
        products: { $push: '$$ROOT' },
      },
    },
  ]);

  return Response(res, { products });
};
const getAllData = async (req, res) => {
  try {
    const listCategory = await Category.find({}).lean().exec();
    const listBanner = await Banner.find({}).lean().exec();

    let listProduct = await Promise.all(
      listCategory.map(async (category) => {
        const { _id, slug, name } = category;

        const products = await Product.aggregate([
          {
            $match: {
              category: _id,
            },
          },
          {
            $group: {
              _id: {
                ram: '$detailsProduct.ram',
                storage: '$detailsProduct.storage',
              },
              colors: {
                $push: '$color',
              },
              products: {
                $push: {
                  _id: '$_id',
                  name: '$name',
                  slug: '$slug',
                  regularPrice: '$regularPrice',
                  salePrice: '$salePrice',
                  productPictures: '$productPictures',
                  category: '$category',
                  detailsProduct: '$detailsProduct',
                  sale: '$sale',
                },
              },
            },
          },
        ]);

        if (products.length > 0) {
          return { category: { _id, name, slug }, products };
        }
        return null;
      })
    );
    const products = listProduct.filter(Boolean);

    Response(res, {
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
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: '$category',
          product: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: {
          newRoot: '$product',
        },
      },
      {
        $project: {
          name: 1,
          productPictures: 1,
          sale: 1,
          salePrice: 1,
          regularPrice: 1,
          detailsProduct: 1,
          category: '$category.slug',
        },
      },
    ]);
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
