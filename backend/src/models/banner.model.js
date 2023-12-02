const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    nameBanner: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('banner', bannerSchema);
