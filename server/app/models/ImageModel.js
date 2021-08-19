const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  img:
  {
      data: Buffer,
      contentType: String,
  },
  token: String
});


module.exports = mongoose.model('Image', ImageSchema);