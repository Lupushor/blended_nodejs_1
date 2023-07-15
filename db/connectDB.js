const mongoose = require('mongoose');

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectDB = (uri, options = defaultOptions) => {
  return mongoose.connect(uri, options);
};

module.exports = connectDB;