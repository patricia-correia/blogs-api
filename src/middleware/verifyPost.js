const postService = require('../services/blogPost.service');

const verifyPostEdit = async (req, res, next) => {
  const user = req.user.id;
  const { id } = req.params;

  const post = await postService.getPostById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (post.userId !== user) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};

module.exports = { verifyPostEdit };