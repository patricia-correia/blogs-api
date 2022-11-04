const categoryService = require('../services/category.service');
const { validateBodyCategory } = require('../validated/auth.service');

const category = async (req, res) => {
  try {
    const { error } = validateBodyCategory(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const newCategory = await categoryService.createCategory(req.body);
    if (!newCategory) {
      return res.status(400).json({ message: 'Category was not created!' });
    }
    return res.status(201).json(newCategory);
  } catch (err) {
    res.status(505).json({ message: 'Deu ruim!' });
  }
};

const getCategory = async (_req, res) => {
  try {
    const categories = await categoryService.getAllCategory();
    return res.status(200).json(categories);
  } catch (err) {
    res.status(506).json({ message: 'Deu ruim' });
  }
};

module.exports = { category, getCategory };