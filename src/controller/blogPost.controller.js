const postService = require('../services/blogPost.service');
const { updateBody } = require('../validated/auth.service');

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
    res.status(509).json({ message: 'Deur ruim!' });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = updateBody(req.body);
    
    if (error) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const postEdit = await postService.editPost(id, req.body);
    
    if (!postEdit > 0) {
      return res.status(400).json({ message: 'Post was not edited' });
    }
    
    const post = await postService.getPostById(id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(510).json({ message: 'Deu ruim!' });
  }
};

module.exports = {
  getById,
  getPostById,
  editPost,
};