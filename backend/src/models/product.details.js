const mongoose = require('mongoose');

const detailsProduct = mongoose.Schema({
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
});

module.exports = mongoose.model('DetailsProduct', detailsProduct);
