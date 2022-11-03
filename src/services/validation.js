const { User } = require('../models');

const validateLogin = async ({ email }) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const getUser = async (user) => {
  const newUser = await User.create(user);

  return newUser;
};

module.exports = { validateLogin, getUser };