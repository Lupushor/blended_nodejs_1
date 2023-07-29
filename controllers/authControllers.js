const { signupService, loginService, logoutService} = require('../services/authServices');

const controllerWrapper = require('../utils/controllerWrapper');

const signup = controllerWrapper(async (req, res) => {
  const user = await signupService(req.body);
  res.status(201).json(user);
});

const login = controllerWrapper(async (req, res) => {
  const user = await loginService(req.body);
  res.json(user);
});

const logout = controllerWrapper(async (req, res) => {
  await logoutService(req.user._id);
  res.status(200).json({
    message: 'Logout successful'
  });
});

module.exports = {
  signup,
  login,
  logout
};