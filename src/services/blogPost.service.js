const { User, Category, BlogPost } = require('../models');

const createPost = async (posts) => {
  const newPost = await BlogPost.create(posts);
  
  return newPost;
};

const getAllPost = async (id) => {
  const categories = await BlogPost.findAll({
    where: { userId: id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] } },
    ],
  });

  return categories;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { userId: id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] } },
    ],
});

return post;
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
};