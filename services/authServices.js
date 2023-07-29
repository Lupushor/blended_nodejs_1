const bcryptjs = require('bcryptjs');

const HttpError = require("../utils/HttpError");

const User = require("../models/User");

const { createTokens } = require('../utils/createTokens');

const signupService = async ({username, email, password}) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "This user alreary exsist");
  };

  const hashedPwd = await bcryptjs.hash(password, 12);

  return await User.create({
    email,
    username,
    password: hashedPwd,
  });
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, "Email or password invalid");
  };

  const isPwdCorrect = await bcryptjs.compare(password, user.password);

  if (!isPwdCorrect) {
    throw new HttpError(401, "Email or password invalid");
  };

  const { accessToken, refreshToken } = createTokens(user);
  const updatedUser = await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken }, {new: true});
  
  return {
    user: updatedUser,
    accessToken,
  };
};

const logoutService = async (id) => {
  await User.findByIdAndUpdate(id, { refresh_token: null });
};

module.exports = {
  signupService,
  loginService,
  logoutService,
};