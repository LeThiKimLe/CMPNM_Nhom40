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

const getProductAll = async () => {
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
  return products;
}
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
  const filterData = req.body.data;

  const commonPipeline = [
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
  ];

  if (filterData.category === 'all') {
    const products = await Product.aggregate(commonPipeline);
    return Response(res, { products });
  }
  if (filterData.level && filterData.level === '2') {
    const categoryLevel = await Category.findOne({ slug: filterData.category }).select('id').lean();
    const products = await Product.aggregate([
      {
        $match: {
          active: true,
          category_path: { $exists: true, $ne: [] },
          'category_path.1': categoryLevel._id,
        },
      },
      ...commonPipeline,
    ]);
    return Response(res, { products });
  } if (filterData.level && filterData.level === '3') {
    const categorySlugs = filterData.category.split('+');
    const categories = await Category.find({ slug: { $in: categorySlugs } }, 'id');
    const categoryIDs = categories.map(obj => obj._id);
    const products = await Product.aggregate([
      {
        $match: {
          active: true,
          category_path: { $exists: true, $ne: [] },
          'category_path.2': { $in: categoryIDs },
        },
      },
      ...commonPipeline,
    ]);
    return Response(res, { products });
  }
  const categorySlugs = filterData.category.split('+');
  const categories = await Category.find({ slug: { $in: categorySlugs } }, 'id');
  const categoryIDs = categories.map(obj => obj._id);
  const products = await Product.aggregate([
    ...commonPipeline,
    {
      $match: {
        active: true,
        category_path: { $exists: true, $ne: [] },
        'category_path.0': { $in: categoryIDs },
      },
    },
  ]);
  return Response(res, { products });
};

module.exports = {
  createProduct,
  getAll,
  deleteProduct,
  getProductsOption,
  getProductById,
};
