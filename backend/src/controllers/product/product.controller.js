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
const http = require('http');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: '150208bt',
  },
});

const _ = require('lodash');
const { Product, Category } = require('../../models');
const { Response, ServerError, Create } = require('../../utils');
const cloudinary = require('../../utils/upload_file/cloudinary');
const redisClient = require('../../connections/cachingRedis');
const getPaginationProduct = require('../../utils/pagination');

async function testConnection() {
  try {
    const response = await client.ping();
    console.log('Elasticsearch is up and running:', response);
  } catch (error) {
    console.error('Error connecting to Elasticsearch:', error);
  }
}

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

const testELK = async (req, res) => {
  await testConnection();
  return res.status(200).json('oke');
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
  const size = 12;
  const filterData = req.body.data;
  let categoryId;
  let query = {};
  const page = filterData.page || 1;
  if (filterData.category === 'all') {
    categoryId = await Category.find({}).select('_id name slug').lean();
  } else {
    const categorySlugs = filterData.category.split('-');
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
    const osSlugs = filterData.type.split('-');
    query['detailsProduct.OS'] = { $in: osSlugs };
  }
  if (filterData.ram && filterData.ram !== 'all') {
    const ramSlugs = filterData.ram.split('-');
    query['detailsProduct.ram'] = { $in: ramSlugs };
  }
  if (filterData.storage && filterData.storage !== 'all') {
    const storageSlugs = filterData.storage.split('-');
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

  // Chia mảng sản phẩm thành các phần tử con có độ dài bằng với kích thước trang

  // Tính toán các giá trị cần trả về
  Response(res, {
    products,
  });
};
/*
const getProductsOption = async (req, res) => {
  const page = 1;
  const size = 12;
  const filterData = req.body.data;
  let categoryId;

  if (filterData.category === 'all') {
    categoryId = await Category.find({}).select('_id name slug').lean();
  } else if (Array.isArray(filterData.category)) {
    categoryId = await Category.find({ _id: { $in: filterData.category } })
      .select('_id name slug')
      .lean();
  } else {
    categoryId = await Category.find({ _id: filterData.category })
      .select('_id name slug')
      .lean();
  }
  const listProduct = await Promise.all(
    categoryId.map(async (category) => {
      const { _id, name, slug } = category;
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

  // Chia mảng sản phẩm thành các phần tử con có độ dài bằng với kích thước trang
  const chunks = _.chunk(products, size);

  // Tính toán các giá trị cần trả về
  const totalProduct = products.length;
  console.log(totalProduct);
  const data = chunks[page - 1] || [];
  const totalPages = chunks.length;

  Response(res, { products, data, totalPages });
};
*/
module.exports = {
  createProduct,
  getAll,
  getAllAfterHandle,
  deleteProduct,
  updateAll,
  getProductsOption,
  getProductById,
  testELK,
};
