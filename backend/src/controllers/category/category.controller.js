/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const slugify = require('slugify');
const { Category } = require('../../models');
const { Response, ServerError, Create } = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');
// create category
// eslint-disable-next-line no-unused-vars
const create = async (req, res) => {
  const { picture, name } = req.body.data;
  const uploadResponse = await cloudinary.uploader.upload(picture, {
    folder: 'Images/Category',
    resource_type: 'auto',
  });
  const { url } = uploadResponse;

  const category = new Category({
    name,
    slug: `${slugify(name)}`,
    createdBy: req.user.userId,
    categoryImage: url,
  });
  category.save(async (error, cat) => {
    if (error) return ServerError(res, error.message);
    if (cat) {
      return Create(res, { message: 'Create category successfully' });
    }
  });
};
const getAll = async (req, res) => {
  const categories = await Category.find({}).select(
    '_id name slug categoryImage isActive'
  );
  return Response(res, { list: categories });
};
module.exports = {
  create,
  getAll,
};
