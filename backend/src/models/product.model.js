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
    ram: {
      required: true,
      type: String,
    },
    storage: {
      required: true,
      type: String,
    },
    detailsProduct: {
      screen: {
        type: String,
        required: true,
      },
      os: {
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
      type: String,
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('products', productSchema);
