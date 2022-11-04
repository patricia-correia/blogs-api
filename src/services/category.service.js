const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create(name);
  
  return newCategory;
};

const getAllCategory = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findOne({ where: { id: categoryId } });
  if (category !== null) {
    return true;
  }
  return false;
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
};