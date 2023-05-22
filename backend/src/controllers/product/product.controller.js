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
/*
function getGreatGrandchildren(categories, categoryIds) {
  const greatGrandchildren = [];
  console.log('chay select');
  // Create a hash table of categories by their parent ID
  const categoryHash = {};
  for (const category of categories) {
    if (!categoryHash[category.parentId]) {
      categoryHash[category.parentId] = [];
    }
    categoryHash[category.parentId].push(category);
  }

  // Recursive function to scan all children categories at a certain level for a given category ID
  function scanLevel(categoryId, level) {
    if (categoryHash[categoryId]) {
      const children = categoryHash[categoryId];
      for (const child of children) {
        if (child.level === level) {
          const hasChildren =
            categoryHash[child._id] && categoryHash[child._id].length > 0;
          const isParent = categories.some(
            (category) => category.parentId === child._id
          );
          if (!isParent || !hasChildren) {
            greatGrandchildren.push(child);
          }
          if (hasChildren) {
            scanLevel(child._id, level + 1);
          }
        }
      }
    }
  }
  // Check if there are any categories at a certain level
  function hasCategoriesAtLevel(level) {
    return categories.some((category) => category.level === level);
  }
  // Scan all levels recursively for each category ID in the list
  for (const categoryId of categoryIds) {
    const category = categories.find((cate) => cate._id == categoryId);
    if (!category) {
      console.log(`Category with ID ${categoryId} not found`);
    } else {
      let { level } = category;
      while (true) {
        const hasCategories = hasCategoriesAtLevel(level);
        if (!hasCategoriesAtLevel) {
          break;
        }
        scanLevel(categoryId, level);
        level++;
      }
    }
  }
  console.log(greatGrandchildren);
  return greatGrandchildren;
}
*/
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
  console.log(searchModel);
  let listProduct = [];
  const cacheResults = await redisClient.get('products');
  if (cacheResults) {
    listProduct = JSON.parse(cacheResults);
    console.log(searchModel.category);
    listProduct = listProduct.filter((product) =>
      searchModel.category.includes(product.category)
    );
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
