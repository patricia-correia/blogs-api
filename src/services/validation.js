const { User } = require('../models');

const validateLogin = async ({ email }) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const getAll = async () => {
  const user = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return user;
};

const getUser = async (user) => {
  const newUser = await User.create(user);

  return newUser;
};

module.exports = { validateLogin, getAll, getUser };