const { User } = require('../models');

const getAll = async () => {
  const user = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return user;
};

const createUsers = async (user) => {
  const newUser = await User.create(user);

  return newUser;
};

const getUserId = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  return user;
};

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = {
  getAll,
  createUsers,
  getUserId,
  deleteUser,
};