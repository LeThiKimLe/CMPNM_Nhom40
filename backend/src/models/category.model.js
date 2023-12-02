const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    level: {
      type: Number,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    }
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model('categories', categorySchema);
