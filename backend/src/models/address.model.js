const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    address: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
          min: 3,
          max: 50,
        },
        address: {
          type: String,
          required: true,
          trim: true,
        },
        mobileNumber: {
          type: String,
          required: true,
          trim: true,
        },
        provinceName: {
          type: String,
          required: true,
        },
        provinceId: {
          type: String,
          required: true,
        },
        districtName: {
          type: String,
          required: true,
          trim: true,
        },
        districtId: {
          type: String,
          required: true,
          trim: true,
        },
        wardCode: {
          type: String,
          required: true,
          trim: true,
        },
        wardName: {
          type: String,
          required: true,
          trim: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { collection: 'addresses' },
  { timestamps: true }
);

module.exports = mongoose.model('user_addresses', userAddressSchema);
