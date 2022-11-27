/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const slugify = require('slugify');
const { Product } = require('../../models');
const { Response, ServerError, Create } = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');

const createProduct = async (req, res) => {
  const { info, digital, description } = req.body.data;

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
      delete info.productPictures;
      info.productPictures = productPictures;
      const product = new Product({
        ...info,
        stock: Number(info.stock),
        description,
        detailsProduct: {
          ...digital,
        },
      });
      product.slug = slugify(
        `${info.name}${info.color}${digital.ram}${digital.storage}`
      );
      product.createdBy = req.user.userId;

      return product.save(product);
    })
    .then(() => Create(res, 'Create product successfully!'))
    .catch((error) => ServerError(res, error.message));
};

const getAll = async (req, res) => {
  const products = await Product.find({}).select(
    '_id name slug regularPrice color stock productPictures category active createdAt description'
  );
  return Response(res, { list: products });
};
const deleteProduct = async (req, res) => {
  const listID = req.body.data;
  await Product.deleteMany({
    _id: {
      $in: listID,
    },
  });
  return Response(res);
};
const updateAll = async (req, res) => {
  Product.find().forEach((x) => {
    x.stock = parseInt(x.stock);
    Product.save(x);
  });
  return Response(res);
};
const getProductsOption = async (req, res) => {
  const listProduct = await Product.find({ active: true }).select(
    '_id name slug regularPrice salePrice color stock productPictures category active createdAt detailsProduct sale description quantitySold'
  );
  return Response(res, { list: listProduct });
};
module.exports = {
  createProduct,
  getAll,
  deleteProduct,
  updateAll,
  getProductsOption,
};
