const { Op } = require('sequelize');
const { User, Category, BlogPost } = require('../models');

const createPost = async (posts) => {
  const newPost = await BlogPost.create(posts);
  
  return newPost;
};

const getAllPost = async () => {
  const categories = await BlogPost.findAll({
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
    where: { id },
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

const editPost = async (id, { title, content }) => {
  const [post] = await BlogPost.update(
    { title, content },
    { where: { id } },
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] } }],
    },
  );
  return post;
};

const deletePost = async (id) => {
  const post = await BlogPost.destroy({ where: { id } });
  return post;
};

const getPostSearch = async (search) => {
  const post = await BlogPost.findAll({
    where: { [Op.or]: [
        { title: { [Op.substring]: search } },
        { content: { [Op.substring]: search } },
    ] },
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
  editPost,
  deletePost,
  getPostSearch,
};