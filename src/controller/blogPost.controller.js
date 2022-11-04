const postService = require('../services/blogPost.service');

const getById = async (req, res) => {
  try {
    const { id } = req.user;

    const postList = await postService.getAllPost(id);

    if (postList) return res.status(200).json(postList);

    return res.status(400).json({ message: 'posts not found' });
  } catch (err) {
    res.status(508).json({ message: 'Deu ruim' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    if (post) return res.status(200).json(post);

    return res.status(404).json({ message: 'Post does not exist' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  getById,
  getPostById,
};