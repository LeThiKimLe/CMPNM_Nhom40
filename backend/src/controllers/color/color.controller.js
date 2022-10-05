/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const { Color } = require('../../models');
const { Response, BadRequest, ServerError } = require('../../utils');

const getAllColorByCategory = async (req, res) => {
  const { id } = req.params;
  const listColor = await Color.find({ category: id }).exec();
  return Response(res, { list: listColor });
};
const addColor = async (req, res) => {
  const { name, value, category } = req.body.data;
  const colorExits = await Color.find({
    $and: [
      {
        $or: [{ name }, { category }],
      },
      {
        $or: [{ value }, { category }],
      },
    ],
  });

  if (colorExits.length > 0) {
    return BadRequest(res, 'Color is exists');
  }
  const newColor = new Color({ name, value, category });
  newColor.save((error, color) => {
    if (error) return ServerError(res, error.message);
    return Response(res, 'Add Color Successfully!');
  });
};
module.exports = {
  getAllColorByCategory,
  addColor,
};
