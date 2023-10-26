const slugify = require('slugify');
const { Color } = require('../../models');
const { Response, Create } = require('../../utils');

const create = async (req, res) => {
  try {
    const { label, value } = req.body.data;
    const slug = slugify(`${label}`, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    const newColor = new Color({
      code: slug,
      name: value,
      value: label,
    });

    await newColor.save();

    return Create(res);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, code, value } = req.body;
    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      { name, code, value },
      { new: true } // To return the updated color
    );
    if (!updatedColor) {
      return res.status(404).json({ error: 'Color not found' });
    }
    return res.json(updatedColor);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// Get all colors
const getAllColors = async (req, res) => {
  const colors = await Color.find({}).select(
    '_id code name value createdAt'
  );
  return Response(res, { list: colors });
};

// Get a color by ID
const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ error: 'Color not found' });
    }
    return res.json(color);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Delete a color by ID
const deleteColor = async (req, res) => {
  try {
    const deletedColor = await Color.findByIdAndRemove(req.params.id);
    if (!deletedColor) {
      return res.status(404).json({ error: 'Color not found' });
    }
    return res.json({ message: 'Color deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  getAllColors,
  getColorById,
  update,
  deleteColor,
};
