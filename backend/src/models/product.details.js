const mongoose = require('mongoose');

const detailsProduct = mongoose.Schema({
  generalInformation: [String],
  screen: [String],
  backCamera: [String],
  frontCamera: [String],
  OS: {
    type: String,
    required: true,
  },
  cpu: {
    type: String,
    required: true,
  },
  gpu: {
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
  connection: [String],
  batteryPowerAndCharger: [String],
  utilities: [String],
});

module.exports = mongoose.model('DetailsProduct', detailsProduct);
