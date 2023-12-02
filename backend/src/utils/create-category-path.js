/* eslint-disable eqeqeq */
/* eslint-disable no-loop-func */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const _ = require("lodash");

const getCategoryPath = (categories, categoryId) => {
  const path = [];
  let currentCategory = _.find(categories, { _id: mongoose.Types.ObjectId(categoryId) });
  while (currentCategory) {
    path.unshift(currentCategory._id);
    if (currentCategory.parent) {
      currentCategory = _.find(categories, { _id: mongoose.Types.ObjectId(currentCategory.parent) });
    } else {
      currentCategory = null;
    }
  }

  return path;
}


module.exports = {
  getCategoryPath,
}