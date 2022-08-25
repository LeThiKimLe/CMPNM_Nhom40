/* eslint-disable no-console */
const { Screen } = require('../../models');
const { ServerError, Response, NotFound } = require('../../utils');

// admin create update delete
// const create = async (req, res) => {};

// show all screen
const getAll = (req, res) => {
  // find all document
  Screen.find({}).exec((error, screens) => {
    if (error) return ServerError(res, error.message);
    if (screens.length === 0) {
      return NotFound(res, 'Screens');
    }
    return Response(res, screens);
  });
};

module.exports = {
  getAll,
};
