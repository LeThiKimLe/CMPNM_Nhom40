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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    detailsProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DetailsProduct',
      required: true,
    },
    color: { type: String, required: true },
    quantity: {
      type: Number,
      required: true,
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
    },
    productPictures: [{ image: { type: String } }],
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
