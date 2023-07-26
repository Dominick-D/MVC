const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.redirect(`/post/${req.body.post_id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
