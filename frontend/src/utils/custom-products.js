/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import _ from 'lodash';
export const getGroupProduct = (listProduct, category) => {
  const products = [];
  listProduct.map((item) => {
    if (item.category === category) {
      products.push(item);
    }
  });

  return products;
};
export const getAllGroupProducts = (categories, products, listCategoryInit) => {
  let list = [];
  categories.forEach((item) => {
    let group = getGroupProduct(products, item);
    group = customGroupProduct(group, listCategoryInit, item);
    list.push(group);
  });
  return list;
};

export const customGroupProduct = (group, categories, category) => {
  let productGroup = {};
  let listRam = [];
  let listColor = [];
  let listStorage = [];
  let listProductIDs = [];
  let listOption = [];
  const productSelected = group[0];

  productGroup.categorySlug = getCategorySlug(categories, category);
  group.map((item) => {
    listProductIDs.push(item._id);
    const { ram, storage } = item.detailsProduct;
    const option = `${ram}-${storage}`;
    if (listColor.indexOf(item.color) === -1) {
      listColor.push(item.color);
    }
    if (listRam.indexOf(ram) === -1 || listStorage.indexOf(storage)) {
      listOption.push(option);
    }
    if (listRam.indexOf(ram) === -1) {
      listRam.push(ram);
    }
    if (listStorage.indexOf(storage) === -1) {
      listStorage.push(storage);
    }
  });

  productGroup.productSelected = productSelected;
  productGroup.rams = listRam;
  productGroup.products = group;
  productGroup.storages = listStorage;
  productGroup.options = listOption;
  productGroup.groupColors = getListColorGroup(listOption, group);
  return productGroup;
};

export const renderScreen = (screen) => {
  const screens = screen.split(',');
  return screens;
};

const getListColorGroup = (listOption, listProduct) => {
  let listColor = {};
  listOption.map((item) => {
    const ramCheck = item.split('-')[0];
    const storageCheck = item.split('-')[1];
    listColor[`${ramCheck}-${storageCheck}`] = [];
    for (const product of listProduct) {
      const { ram, storage } = product.detailsProduct;
      if (ramCheck === ram && storageCheck === storage) {
        listColor[`${ramCheck}-${storageCheck}`].push(product.color);
      }
    }
  });
  return listColor;
};

export const getListCategory = (listProduct) => {
  let categories = [];
  listProduct.map((item) => {
    if (categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });
  return categories;
};

export const getListProductByCategory = (productGroups, categories, sort) => {
  let listProduct = [];
  if (Object.keys(categories).length === 0) {
    listProduct = productGroups;
  } else {
    for (const cate of categories) {
      productGroups.map((item) => {
        if (item.categoryOne === cate) {
          listProduct.push(item);
        }
      });
    }
  }

  let sortProducts = [];
  if (Object.keys(listProduct).length !== 0) {
    switch (sort) {
      case 1:
        sortProducts = listProduct.slice().sort(function (a, b) {
          return a.productSelected.salePrice - b.productSelected.salePrice;
        });
        break;
      case -1:
        sortProducts = listProduct.slice().sort(function (a, b) {
          return b.productSelected.salePrice - a.productSelected.salePrice;
        });
        break;
      case 0:
        sortProducts = listProduct.slice().sort(function (a, b) {
          return a.productSelected.sale - b.productSelected.sale;
        });
        break;
      case 2:
        sortProducts = listProduct.slice();
        break;
      default:
        break;
    }
  }
  return sortProducts;
};
export const getCategoryLevelOne = (listCategory, category) => {
  let parent;
  parent = _.find(listCategory, { _id: category });
  do {
    parent = _.find(listCategory, { _id: parent.parentId });
  } while (parent.parentId);
  return parent._id;
};
export const getCategoryName = (list, id) => {
  const category = _.find(list, { _id: id });
  return category.name;
};
export const getCategorySlug = (list, id) => {
  const category = _.find(list, { _id: id });
  return category.slug;
};
export const getProduct = (products, ram, color, storage) => {
  const product = _.find(products, {
    color: color,
    'detailsProduct.ram': ram,
    'detailsProduct.storage': storage,
  });
  return product;
};

export const getDetailCartItem = (products, cartItem) => {
  let itemProduct = {};
  products.map((item) => {
    if (item._id === cartItem.product) {
      itemProduct = {
        product: {
          ...item,
        },
        quantity: cartItem.quantity,
      };
    }
  });
  return itemProduct;
};

export const getColorProduct = (product, colors) => {
  let colorName = '';
  const { color, category } = product;
  colors.map((item) => {
    if (item.value === color && item.category == category) {
      colorName = item.name;
    }
  });
  return colorName;
};
export const customListOrderProducts = (products) => {
  let list = [];
  products.map((item) => {
    const newItem = {
      productId: item._id,
      price: item.salePrice,
      purchasedQty: item.quantity,
    };
    list.push(newItem);
  });
  return list;
};

export const customeListOrderProductsPaypal = (products, colors) => {
  let list = [];
  console.log(colors);
  products.map((item) => {
    const { ram, storage } = item.detailsProduct;
    const { name, salePrice, quantity } = item;
    const colorName = getColorProduct(item, colors);

    const newItem = {
      name,
      ram,
      storage,
      salePrice,
      quantity,
      colorName,
    };
    list.push(newItem);
  });
  return list;
};
