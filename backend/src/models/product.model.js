const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    attribute: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'attribute',
    },
    detailsProduct: {
      screen: {
        type: String,
        required: true,
      },
      OS: {
        type: String,
        required: true,
      },
      backCamera: {
        type: String,
        required: true,
      },
      frontCamera: {
        type: String,
      },
      cpu: {
        type: String,
        required: true,
      },
      sim: {
        type: String,
        required: true,
      },
      batteryPowerAndCharger: {
        type: String,
        required: true,
      },
    },
    color: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'colors',
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
    },
    productPictures: [String],
    category_path: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('products', productSchema);
