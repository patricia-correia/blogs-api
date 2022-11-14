const { PostCategory } = require('../models');

const aditionPostCategory = async (categories, postId) => {
  categories.forEach((categoryId) => {
    PostCategory.create({ categoryId, postId });
  });
};

module.exports = { aditionPostCategory };