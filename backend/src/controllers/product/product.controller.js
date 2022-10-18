/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const slugify = require('slugify');
const { Product, ProductDetails } = require('../../models');
const { Response, ServerError, Create } = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');

const createProduct = async (req, res) => {
  const { info, digital, desctiption } = req.body.data;

  let productPicturesUpload = [];
  let productPictures = [];
  info.productPictures.map((picture) => {
    const uploadResponse = cloudinary.uploader.upload(picture, {
      folder: `Images/Product`,
      resource_type: 'auto',
    });
    productPicturesUpload.push(uploadResponse);
  });
  Promise.all([...productPicturesUpload])
    .then((values) => {
      for (let i = 0; i < info.productPictures.length; i++) {
        productPictures.push(values[i].url);
      }

      const detailsProduct = new ProductDetails({
        ...digital,
      });
      return detailsProduct.save();
    })
    .then((result) => {
      const detailsProduct = result._id;
      delete info.productPictures;
      info.productPictures = productPictures;
      const product = new Product({
        ...info,
        desctiption,
        detailsProduct,
      });
      product.slug = slugify(info.name);
      product.createdBy = req.user.userId;

      return product.save(product);
    })
    .then(() => Create(res, 'Create product successfully!'))
    .catch((error) => ServerError(res, error.message));
};

const getAll = async (req, res) => {
  const products = await Product.find({}).select(
    '_id name slug regularPrice color stock productPictures category active createdAt'
  );
  return Response(res, { list: products });
};
module.exports = {
  createProduct,
  getAll,
};
