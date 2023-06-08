const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserAddress',
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shipAmount: {
      type: Number,
      default: 0,
    },
    freeShip: {
      type: Number,
      default: 0,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        price: {
          type: String,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'cancelled', 'refund'],
      required: true,
      default: 'pending',
    },
    paymentType: {
      type: String,
      enum: ['cod', 'paypal', 'momo'],
      required: true,
      default: 'cod',
    },
    payerID: {
      type: String,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: [
            'pending',
            'packed',
            'shipping',
            'delivered',
            'cancelled',
            'refund',
          ],
          default: 'pending',
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    // ngày giao hàng dự kiến
    deliveryDate: {
      type: Date,
    },
    // thời gian vận chuyển
    estimatedDeliveryTime: {
      type: Number,
    },
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model('Orders', orderSchema);
