/* eslint-disable array-callback-return */
import _ from 'lodash';
export function createCategoryGroup(categories, parentId) {
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
}
