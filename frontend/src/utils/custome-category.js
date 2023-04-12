/* eslint-disable array-callback-return */
const _ = require('lodash');
export const createCategoryGroup = (categories, parentId) => {
  let categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId === undefined);
  } else {
    category = categories.filter((cat) => cat.parentId === parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      level: cate.level,
      children: createCategoryGroup(categories, cate._id),
    });
  }
  return categoryList;
};

export const getAllCateFromLevel = (categories, categoryId) => {
  const list = createCategories(categories, categoryId);
  let listCategory = list;
  list.map((item) => {
    if (Object.keys(item.children).length > 0) {
      item.children.map((child) => {
        listCategory.push(child);
      });
    } else {
      return;
    }
  });
  listCategory = _.map(listCategory, '_id');
  return listCategory;
};
export const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId === undefined);
  } else {
    category = categories.filter((cat) => cat.parentId === parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
};
