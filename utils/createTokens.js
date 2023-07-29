require('dotenv').config();

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, ACCESS_TOKEN_EXPIRES_IN } = process.env;

const jwt = require('jsonwebtoken');

const createTokens = ({username, email, _id}) => {
  const payload = { id: _id, username, email, }
  
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  createTokens,
};