/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const slugify = require('slugify');
const mongoose = require('mongoose');

const _ = require('lodash');
const { Product } = require('../../models');
const { Response, ServerError, Create } = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');
const redisClient = require('../../connections/cachingRedis');
const getPaginationProduct = require('../../utils/pagination');

const getChildren = (categories, category) => {
  let list = [];
  categories.map((item) => {
    if (item.parentId == category) {
      list.push(item._id);
    }
  });
  return list;
};
const getAllCategorySelectLevelOne = (categories, categorySelect) => {
  let list = [];
  for (let cate of categorySelect) {
    const category = _.find(categories,(c) => c._id == cate);
      let newListCategory = getChildren(categories, category._id);
      list.push(
        ...newListCategory,
        ...getAllCategorySelectLevelOne(categories, newListCategory)
      );
  }
  return list;
};
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
const getAllAfterHandle = async (req, res) => {
  let listProducts = [];
  try {
    listProducts = await Product.find({ active: true });
    await redisClient.set('products', JSON.stringify(listProducts));

    Response(res, { list: listProducts });
  } catch (error) {
    ServerError(res);
  }
};

const getAll = async (req, res) => {
  let listProducts = [];
  try {
    const cacheResults = await redisClient.get('products');
    if (cacheResults) {
      isCached = true;
      listProducts = JSON.parse(cacheResults);
    } else {
      listProducts = await Product.find({}).select(
        '_id name slug regularPrice salePrice color stock productPictures category active createdAt detailsProduct sale description quantitySold'
      );
      await redisClient.set('products', JSON.stringify(listProducts));
    }

    Response(res, { list: listProducts });
  } catch (error) {
    ServerError(res);
  }
};

const deleteProduct = async (req, res) => {
  const listID = req.body.data;
  await Product.updateMany(
    {
      _id: {
        $in: listID,
      },
    },
    { $set: { active: false } }
  );
  return Response(res);
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).select(
    '_id name slug regularPrice salePrice color stock productPictures category active createdAt detailsProduct sale description quantitySold'
  );
  Response(res, { product });
  // Product.findById()
};
const updateAll = async (req, res) => {
  Product.find().forEach((x) => {
    x.stock = parseInt(x.stock);
    Product.save(x);
  });
  return Response(res);
};
const getProductsOption = async (req, res) => {
  const page = 1;
  const size = 12;
  const searchModel = req.body.data;
  let listProduct = [];
  const cacheResults = await redisClient.get('products');
  if (cacheResults) {
    isCached = true;
    listProduct = JSON.parse(cacheResults);
    let categoryCache = await redisClient.get('categories');
    // check search model child 
    listCategory = JSON.parse(categoryCache);
    if (Object.keys(searchModel.category).length !== 0) {
      let categories = [];
      if (searchModel.child) {
        categories = searchModel.category;
      } else {
        categories = getAllCategorySelectLevelOne(
          listCategory,
          searchModel.category
        );
      }
      listProduct = listProduct.filter((product) =>
        categories.includes(product.category)
      );
    }
    if (Object.keys(searchModel.ram).length !== 0) {
      listProduct = _.filter(listProduct, (product) =>
        searchModel.ram.includes(product.detailsProduct.ram)
      );
    }
    if (Object.keys(searchModel.storage).length !== 0) {
      listProduct = _.filter(listProduct, (product) =>
        searchModel.storage.includes(product.detailsProduct.storage)
      );
    }
    if (Object.keys(searchModel.os).length !== 0) {
      listProduct = _.filter(listProduct, (product) =>
        searchModel.os.includes(product.detailsProduct.OS)
      );
    }
  }
  listProduct = getPaginationProduct(listProduct, 1);
  return Response(res, { list: listProduct });
};

module.exports = {
  createProduct,
  getAll,
  getAllAfterHandle,
  deleteProduct,
  updateAll,
  getProductsOption,
  getProductById,
};
