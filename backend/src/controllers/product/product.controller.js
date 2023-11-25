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
const url = require('url');

const _ = require('lodash');
const { Product, Category } = require('../../models');
const { Response, ServerError, Create, getCategoryPath } = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');

const createProduct = async (req, res) => {
  try {
    const { info, digital, description } = req.body.data;
    const categories = await Category.find({}).exec();
    const uploadPromises = info.productPictures.map((picture) =>
      cloudinary.uploader.upload(picture, {
        folder: `Images/Product`,
        resource_type: 'auto',
      })
    );
    const uploadResults = await Promise.all(uploadPromises);
    const productPictures = uploadResults.map((result) => result.url);
    delete info.productPictures;
    info.productPictures = productPictures;
    const categoryPath = getCategoryPath(categories, info.category);

    const product = new Product({
      ...info,
      category_path: categoryPath,
      stock: Number(info.stock),
      description,
      ram: digital.ram,
      storage: digital.storage,
      detailsProduct: {
        ...digital,
      },
    });
    product.slug = slugify(
      `${info.name}-${digital.ram}-${digital.storage}-${info.color}`,
      {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      }
    );
    await product.save();

    Create(res);
  } catch (error) {
    ServerError(res);
  }
};

const getAll = async (req, res) => {
  let listProducts = [];
  try {
    listProducts = await Product.find({ active: true })
      .populate({
        path: 'category_path',
        select: 'name',
      })
      .exec();
    Response(res, { list: listProducts });
  } catch (error) {
    ServerError(res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const listID = req.body.data;
    const result = await Product.updateMany(
      { _id: { $in: listID } },
      { active: false }
    );
    if (result.nModified === 0) {
      return res.status(400).json({ error: 'Products not found' });
    }
    Response(res);
  } catch (error) {
    ServerError(res);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).select(
    '_id name slug regularPrice salePrice color ram storage stock productPictures category active createdAt detailsProduct sale description quantitySold'
  );
  Response(res, { product });
};

const getProductsOption = async (req, res) => {
  const size = 12;
  const filterData = req.body.data;
  const page = filterData.page || 1;
  let categoryId;
  let query = {};
  if (filterData.level && filterData.level === '2') {
    const categoryLevel = await Category.findOne({ slug: filterData.category });
    categoryId = await Category.find({
      parent: categoryLevel._id,
    });
  } else if (filterData.level && filterData.level === '3') {
    const categorySlugs = filterData.category.split('+');
    categoryId = await Category.aggregate([
      { $match: { slug: { $in: categorySlugs } } },
    ]);
  } else if (filterData.category === 'all') {
    categoryId = await Category.find({}).select('_id name slug').lean();
  } else {
    const categorySlugs = filterData.category.split('+');
    categoryId = await Category.aggregate([
      { $match: { slug: { $in: categorySlugs } } },
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parent',
          as: 'descendants',
        },
      },
      { $unwind: '$descendants' },
      { $replaceRoot: { newRoot: '$descendants' } },
      {
        $match: {
          'descendants.children': { $exists: false },
        },
      },
    ]);
  }

  const categoryIds = categoryId.map((item) => item._id);
  query = {
    category: { $in: categoryIds },
  };
  if (filterData.type && filterData.type !== 'all') {
    const osSlugs = filterData.type.split('+');
    query['detailsProduct.OS'] = { $in: osSlugs };
  }
  if (filterData.ram && filterData.ram !== 'all') {
    const ramSlugs = filterData.ram.split('+');
    query['detailsProduct.ram'] = { $in: ramSlugs };
  }
  if (filterData.storage && filterData.storage !== 'all') {
    const storageSlugs = filterData.storage.split('+');
    query['detailsProduct.storage'] = { $in: storageSlugs };
  }
  const products = await Product.aggregate([
    { $match: query },
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
        _id: {
          category: '$category._id',
          name: '$category.name',
          slug: '$category.slug',
          ram: '$detailsProduct.ram',
          storage: '$detailsProduct.storage',
        },

        products: {
          $push: {
            _id: '$_id',
            name: '$name',
            slug: '$slug',
            regularPrice: '$regularPrice',
            salePrice: '$salePrice',
            sale: '$sale',
            productPictures: '$productPictures',
            detailsProduct: '$detailsProduct',
          },
        },
        colors: { $addToSet: '$color' },
      },
    },
    {
      $group: {
        _id: {
          category: '$_id.category',
          name: '$_id.name',
          slug: '$_id.slug',
          ram: '$_id.ram',
          storage: '$_id.storage',
        },
        products: { $first: '$products' },
        colors: { $first: '$colors' },
      },
    },
    {
      $group: {
        _id: {
          category: '$_id.category',
          name: '$_id.name',
          slug: '$_id.slug',
        },
        groups: {
          $addToSet: {
            ram: '$_id.ram',
            storage: '$_id.storage',
            products: '$products',
            colors: '$colors',
          },
        },
      },
    },
  ]);

  Response(res, {
    products,
  });
};

module.exports = {
  createProduct,
  getAll,
  deleteProduct,
  getProductsOption,
  getProductById,
};
