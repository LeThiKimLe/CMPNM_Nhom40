/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const slugify = require('slugify');
const redisClient = require('../../connections/cachingRedis');
const { Category, Color } = require('../../models');
const {
  Response,
  ServerError,
  Create,
  Delete,
  BadRequest,
} = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');

const create = async (req, res) => {
  const { name } = req.body.data;
  const categoryExists = await Category.find({ name }).exec();
  if (categoryExists.length > 0) {
    return BadRequest(res, 'Tên thương hiệu đã tồn tại!');
  }
  let categoryImage = '';
  if (req.body.data.picture) {
    const uploadResponse = await cloudinary.uploader.upload(
      req.body.data.picture,
      {
        folder: 'Images/Category',
        resource_type: 'auto',
      }
    );
    const { url } = uploadResponse;
    categoryImage = url;
  }

  const categoryObj = {
    name,
    slug: `${slugify(name)}`,
    createdBy: req.user.userId,
    categoryImage,
  };

  if (req.body.data.parentId) {
    const { parentId } = req.body.data;
    console.log(parentId);
    const cateParent = await Category.findOne({ _id: parentId });
    categoryObj.parentId = parentId;
    categoryObj.level = cateParent.level + 1;
  }
  const category = new Category(categoryObj);
  category.save(async (error, cat) => {
    if (error) return ServerError(res, error.message);
    if (cat) {
      return Create(res, { message: 'Tạo thương hiệu thành công!' });
    }
  });
};
const getAll = async (req, res) => {
  let listCategory = [];
  try {
    const cacheResults = await redisClient.get('categories');
    if (cacheResults) {
      listCategory = JSON.parse(cacheResults);
    } else {
      listCategory = await Category.find({}).select(
        '_id name slug categoryImage isActive parentId level createdAt'
      );
      await redisClient.set('categories', JSON.stringify(listCategory));
    }

    Response(res, { list: listCategory });
  } catch (error) {
    ServerError(res);
  }
};
const getAllAfterHandle = async (req, res) => {
  let listCategory = [];
  try {
    listCategory = await Category.find({}).select(
      '_id name slug categoryImage isActive parentId level createdAt'
    );
    await redisClient.set('categories', JSON.stringify(listCategory));

    Response(res, { list: listCategory });
  } catch (error) {
    ServerError(res);
  }
};

const deleteCategory = (req, res) => {
  const listID = req.body.data;
  Category.deleteMany(
    {
      _id: {
        $in: listID,
      },
    },
    (error, result) => {
      if (error) {
        if (error) return ServerError(res, error.message);
      } else {
        Color.deleteMany(
          {
            category: {
              $in: listID,
            },
          },
          (err) => {
            if (err) {
              if (err) return ServerError(res, err.message);
            } else {
              return Response(res, 'Delete successfully');
            }
          }
        );
      }
    }
  );
};
module.exports = {
  create,
  getAll,
  deleteCategory,
  getAllAfterHandle,
};
