const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  permission_screens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screen',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Permission', permissionSchema);
