const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    trim: true,
  },
  role_description: {
    type: String,
    trim: true,
  },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
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
  Status: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Role', roleSchema);
