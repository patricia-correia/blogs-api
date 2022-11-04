const blogPostService = require('../services/validation');

const getAllPost = async (_req, res) => {
  try {
    const posts = await blogPostService.getAllPost();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(507).json({ message: 'Deu ruim!' });
  }
};

module.exports = { getAllPost };