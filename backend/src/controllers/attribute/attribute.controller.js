const slugify = require('slugify');
const { Response, Create, ServerError, NotFound } = require("../../utils/response");
const { Attribute } = require('../../models');
/// Create
const create = async (req, res) => {
  try {
    const { ram, storage } = req.body.data;
    const slug = slugify(`${ram}-${storage}`, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    const newAttribute = new Attribute({
      code: slug,
      ram,
      storage,
    });

    await newAttribute.save();
    return Create(res);
  } catch (error) {
    return ServerError(res);
  }
};

// Read (Get all attributes)
const getAll = async (req, res) => {
  try {
    const attributes = await Attribute.find({ status: true });
    return Response(res, { list: attributes });
  } catch (error) {
    return ServerError(res);
  }
};

// Read (Get a single attribute by ID)
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const attribute = await Attribute.findById(id);
    if (!attribute) {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    return res.status(200).json(attribute);
  } catch (error) {
    return ServerError(res);
  }
};

// Update
const update = async (req, res) => {
  const { id } = req.params;
  const { ram, storage } = req.body;
  try {
    const updatedAttribute = await Attribute.findByIdAndUpdate(id, { ram, storage }, { new: true });
    if (!updatedAttribute) {
      return NotFound(res, "Attribute")
    }
    return res.status(200).json(updatedAttribute);
  } catch (error) {
    return ServerError(res);
  }
};

// Delete
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAttribute = await Attribute.findByIdAndRemove(id);
    if (!deletedAttribute) {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    return res.status(204).send(); // No content, as the resource has been deleted
  } catch (error) {
    return ServerError(res);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
