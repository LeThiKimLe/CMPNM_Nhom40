const _ = require('lodash');

const getPaginationProduct = (items, page) => {
  const pg = page || 1;
  const pageSize = 12;
  const offset = (pg - 1) * pageSize;
  const pageItems = _.drop(items, offset).slice(0, pageSize);

  return {
    page: pg,
    size: pageSize,
    total: items.length,
    totalPage: Math.ceil(items.length / pageSize),
    data: pageItems,
  };
};
module.exports = getPaginationProduct;
