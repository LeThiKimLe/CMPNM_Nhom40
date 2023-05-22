const jwt = require('jsonwebtoken');

const createJWT = ({ payload, secret, time }) => {
  const token = jwt.sign(payload, secret, { expiresIn: time });
  return token;
};

const isTokenValid = (token, secret) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

const createAccessToken = (user) => {
  const accessToken = createJWT({
    payload: { user },
    secret: process.env.ACCESS_TOKEN_SECRET,
    time: '1h',
  });

  return accessToken;
};
const createRefreshToken = (user) => {
  const refreshToken = createJWT({
    payload: { user },
    secret: process.env.FRESH_TOKEN_SECRET,
    time: '1d',
  });

  return refreshToken;
};

module.exports = {
  createJWT,
  isTokenValid,
  createAccessToken,
  createRefreshToken,
};
