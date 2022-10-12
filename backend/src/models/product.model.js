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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DetailsProduct',
      required: true,
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
