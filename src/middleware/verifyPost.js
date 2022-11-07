const postService = require('../services/blogPost.service');

const verifyPostEdit = async (req, res, next) => {
  const user = req.user.id;

  const post = await postService.getPostById(user);
  if (post === null || post.userId !== user) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};

module.exports = { verifyPostEdit };