/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { Unauthenticated } = require('../utils');

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith('Bearer')) return Unauthenticated(res);
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return Unauthenticated(res); // invalid token
    req.user = decoded.user;
    next();
  });
};

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith('Bearer')) return Unauthenticated(res);
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return Unauthenticated(res); // invalid token
    req.user = decoded.user;
    next();
  });
};
module.exports = {
  authenticateAdmin,
  authenticateUser,
};
