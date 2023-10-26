const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    ram: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    status: {
    type: Boolean,
    required: true,
    default: true,
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('attribute', attributeSchema);
