const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  refresh_token: String,
}, {
  versionKey: false,
});

const User = model("user", schema);

module.exports = User;