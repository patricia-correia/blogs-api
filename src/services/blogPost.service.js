const { Op } = require('sequelize');
const { User, Category, BlogPost, PostCategory } = require('../models');

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

const categoriesValidate = async (categoryIds) => {
  const promises = categoryIds.map((category) => Category.findByPk(category));

  const categories = await Promise.all(promises);
  const validate = categories.every((category) => category !== null);

  return validate;
};

const post = async (postReceive) => {
  const { categoryIds, title, content } = postReceive;

  if (!categoryIds || !title || !content) {
    return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  }

  const verifyCategories = await categoriesValidate(categoryIds);

  if (!verifyCategories) {
    return { type: 'BAD_REQUEST', message: 'one or more "categoryIds" not found' };
  }

  const { dataValues } = await BlogPost.create({
    title, content, userId: 1, published: new Date(), updated: new Date(),
  });

  await PostCategory.bulkCreate(categoryIds.map((category) => ({
      postId: dataValues.id,
      categoryId: category,
    })));

  const categoryOk = await BlogPost.findByPk(dataValues.id);

  return { type: null, message: categoryOk };
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  editPost,
  deletePost,
  getPostSearch,
  post,
};