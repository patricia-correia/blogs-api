const postService = require('../services/blogPost.service');
const { updateBody } = require('../validated/auth.service');

const createPost = async (req, res) => {
  try {
    const { body } = req;

  const { type, message } = await postService.post(body);

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(201).json(message);
  } catch (err) {
      res.status(515).json({ message: 'Deu ruim!' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.user;

    const postList = await postService.getAllPost(id);

    if (postList) return res.status(200).json(postList);

    return res.status(400).json({ message: 'Post não encontrado' });
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
  } catch (err) {
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
      return res.status(400).json({ message: 'Post não está editado' });
    }
    
    const post = await postService.getPostById(id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(510).json({ message: 'Deu ruim!' });
  }
};

const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const postEdit = await postService.deletePost(id);
    if (!postEdit > 0) {
      return res.status(400).json({ message: 'Post não deletado' });
    }    
    return res.status(204).json();
  } catch (err) {
    return res.status(511).json({ message: 'Deu ruim!' });
  }
};

const getPostsSearch = async (req, res) => {
  try {
    const search = req.query.q;

    if (!search) {
      const post = await postService.getAllPost();
      return res.status(200).json(post);
    }

    const posts = await postService.getPostSearch(search);

    return res.status(200).json(posts);
  } catch (err) {
    res.status(514).json({ message: 'Deu ruim!' });
  }
};

module.exports = {
  createPost,
  getById,
  getPostById,
  editPost,
  deletePosts,
  getPostsSearch,
};