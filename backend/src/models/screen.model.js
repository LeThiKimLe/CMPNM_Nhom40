const mongoose = require('mongoose');

// model autoadd
const screenSchema = new mongoose.Schema(
  {
    /*
     * name english
     */
    name: {
      type: String,
      trim: true,
    },
    /*
     * number
     */
    link: {
      type: String,
    },
    /*
     * name tieng viet
     */
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Screen', screenSchema);
