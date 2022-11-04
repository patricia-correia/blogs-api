const { User, Category, BlogPost } = require('../models');

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

const getUserId = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  return user;
};

const createCategory = async (name) => {
  const newCategory = await Category.create(name);
  
  return newCategory;
};

const getAllCategory = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getAllBlogPost = async () => {
  const categories = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return categories;
};

module.exports = {
  validateLogin,
  getAll,
  getUser,
  getUserId,
  createCategory,
  getAllCategory,
  getAllBlogPost,
};