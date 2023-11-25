/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const slugify = require('slugify');
const { default: mongoose } = require('mongoose');

const { Category } = require('../../models');
const { Response, ServerError, Create, BadRequest } = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');

const create = async (req, res) => {
  const { name } = req.body.data;
  const categoryExists = await Category.find({ name }).exec();
  if (categoryExists.length > 0) {
    return BadRequest(res, 'Category name already exists!');
  }
  let image = '';
  if (req.body.data.picture) {
    const uploadResponse = await cloudinary.uploader.upload(
      req.body.data.picture,
      {
        folder: 'Images/Category',
        resource_type: 'auto',
      }
    );
    const { url } = uploadResponse;
    image = url;
  }

  const categoryObj = {
    name,
    slug: `${slugify(name)}`,
    image,
  };

  if (req.body.data.parentId) {
    const { parentId } = req.body.data;
    const cateParent = await Category.findOne({ _id: parentId });
    categoryObj.parent = mongoose.Types.ObjectId(parentId);
    categoryObj.level = cateParent.level + 1;
  } else {
    categoryObj.level = 1;
  }
  const category = new Category(categoryObj);
  category.save(async (error, cat) => {
    if (error) return ServerError(res, error.message);
    if (cat) {
      return Create(res, { message: 'Add category successfully!' });
    }
  });
};
const getAll = async (req, res) => {
  let listCategory = [];
  try {
    listCategory = await Category.find({})
      .select('_id name slug image parent level createdAt')
      .populate("parent", "name")
      .lean()
      .exec();
    Response(res, { list: listCategory });
  } catch (error) {
    ServerError(res);
  }
};
const deleteCategory = async (req, res) => {
  const { listIds } = req.body;
  try {
    const result = await Category.updateMany(
      { _id: { $in: listIds } },
      { status: false }
    );
    if (result.nModified === 0) {
      return res.status(400).json({ error: 'Categories not found' });
    }
    res.status(200).json({ message: 'Categories deleted successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  create,
  getAll,
  deleteCategory,
};
