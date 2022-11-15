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
      type: String,
      required: true,
    },
    sale: {
      type: String,
    },
    salePrice: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
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

      ram: {
        type: String,
        required: true,
      },
      storage: {
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
    color: { type: String, required: true },
    quantitySold: {
      type: String,
      default: 0,
    },
    stock: {
      type: String,
    },
    productPictures: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Product', productSchema);
