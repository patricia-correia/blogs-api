require('dotenv/config');

const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
  return token;
};

const validatedToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (err) {
    return { message: 'Expired or invalid token' };
  }
};

module.exports = {
  createToken,
  validatedToken,
};