const jwt = require('jsonwebtoken');

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

const User = require('../models/User');

const HttpError = require('../utils/HttpError');

const { createTokens } = require('../utils/createTokens');


const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return next(new HttpError(401, "Not authorized"));
  };

  const decoded = jwt.decode(token);
  let user;

  try {
    user = await User.findById(decoded.id);

    if (!user || !user.refresh_token) {
      return next(new HttpError(401, "Not authorized"));
    };

    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = user;
    next();

  } catch (error) {
    if (error?.name !== 'TokenExpiredError') {
      return next(new HttpError(401, error.message || 'Invalid token'));
    }

    try {
      jwt.verify(user.refresh_token, REFRESH_TOKEN_SECRET);

      const { accessToken, refreshToken } = createTokens(user);
      await User.findByIdAndUpdate(user._id, { refreshToken });

      res.status(200).json({
        token: accessToken,
      });

    } catch (error) {
      return next(new HttpError(401, 'Refresh token is expired'));
    }
  };
};

module.exports = {
  auth
};