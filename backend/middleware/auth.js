const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {UnauthorizedError} = require('../utils/errors/apiError');

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError({ statusCode: 401, message: 'Autorização ainda é necessária' });
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError({ statusCode: 401, message: 'Autorização ainda é necessária' });
  }
  req.user = payload; 

  next();
};
