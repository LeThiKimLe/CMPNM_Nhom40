/* eslint-disable array-callback-return */
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
  console.log(list);
  return list;
};

export const customGroupProduct = (group, categories, category) => {
  let productGroup = {};
  let listRam = [];
  let listColor = [];
  let listStorage = [];
  let listProductIDs = [];
  let listOption = [];
  const {
    name,
    productPictures,
    regularPrice,
    salePrice,
    sale,
    detailsProduct,
  } = group[0];
  productGroup.name = name;
  productGroup.picture = productPictures[0];
  productGroup.regularPrice = regularPrice;
  productGroup.salePrice = salePrice;
  productGroup.sale = sale;
  productGroup.screen = detailsProduct.screen;
  productGroup.category = category;
  productGroup.categoryOne = getCategoryLevelOne(categories, category);
  productGroup.categoryOneName = getCategoryName(
    categories,
    productGroup.categoryOne
  );
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

  productGroup.rams = listRam;
  productGroup.storages = listStorage;
  productGroup.options = listOption;
  productGroup.colors = listColor;
  productGroup.ids = listProductIDs;
  return productGroup;
};
export const renderScreen = (screen) => {
  const screens = screen.split(',');
  return screens;
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
export const getCategoryLevelOne = (listCategory, category) => {
  let parent;
  listCategory.map((item) => {
    if (item._id === category) {
      parent = item;
    }
  });

  if (parent.parentId) {
    listCategory.map((value) => {
      if (value._id === parent.parentId) {
        parent = value;
      }
    });
  }
  if (parent.parentId) {
    listCategory.map((value) => {
      if (value._id === parent.parentId) {
        parent = value;
      }
    });
  }
  return parent._id;
};
export const getCategoryName = (list, id) => {
  let name = '';
  list.map((item) => {
    if (item._id === id) {
      name = item.name;
    }
  });
  return name;
};
