const { validatedToken } = require('../utils/jwt.util');

const authorizationValidate = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = validatedToken(authorization);
  if (token.message) {
    return res.status(401).json({ message: token.message });
  }
  req.user = token;
  return next();
};

module.exports = { authorizationValidate };