const { Router } = require("express");

const { signup, login, logout } = require('../controllers/authControllers');
const { signupValidationSchema, loginValidationSchema } = require('../utils/validation/authValidationSchemas');
const { validateBody } = require('../utils/validateBody');

const { auth } = require('../middlewares/auth');

const router = Router();

router.post('/signup', validateBody(signupValidationSchema), signup);
router.post('/login', validateBody(loginValidationSchema), login);
router.post('/logout', auth, logout);

module.exports = {
  authRouter: router,
};