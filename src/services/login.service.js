const { User } = require('../models');
const { createToken } = require('../utils/jwt.util');

const getLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { error: 'Invalid fields' };
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = createToken(userWithoutPassword);

  return token;
};

const validateLogin = async ({ email }) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

module.exports = { getLogin, validateLogin };