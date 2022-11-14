const categoryService = require('../services/category.service');

const verifyCategory = async (req, res, next) => {
      const { categoryIds } = req.body;
    const categories = categoryIds.map((categoryId) => {
      const exist = categoryService.getCategoryById(categoryId);
      return exist;
    });

    const categorie = await Promise.all(categories);

    if (!categorie.every((category) => category === true)) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    return next();
  };

module.exports = { verifyCategory };