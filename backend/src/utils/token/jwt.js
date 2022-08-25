const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 60 * 60 * 24;
  const fiveDay = 60 * 60 * 24 * 5;
  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    signed: true,
    expires: new Date(Date.now() + fiveDay),
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
