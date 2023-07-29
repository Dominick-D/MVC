const router = require('express').Router();
const { Post, UserPostInteraction ,User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
  
    // res.redirect(`/post/${newPost.id}`);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like or Dislike a post
router.put('/like-dislike/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.user_id;

    // Check if the user has already interacted with the post
    const existingInteraction = await UserPostInteraction.findOne({
      where: {
        user_id: userId,
        post_id: postId,
      },
    });

    // If the user has not interacted before, create a new record and increment/decrement likes/dislikes accordingly
    if (!existingInteraction) {
      const { like, dislike } = req.body;
      let likes = like ? 1 : 0;
      let dislikes = dislike ? 1 : 0;

      await UserPostInteraction.create({
        user_id: userId,
        post_id: postId,
        interaction_type: like ? 'like' : 'dislike',
      });

      await Post.increment('likes', { by: likes, where: { id: postId } });
      await Post.increment('dislikes', { by: dislikes, where: { id: postId } });

    } else {
      // If the user has already interacted, update the interaction_type accordingly
      const { interaction_type } = existingInteraction;

      if (interaction_type === 'like') {
        await existingInteraction.update({ interaction_type: 'dislike' });
        await Post.decrement('likes', { where: { id: postId } });
        await Post.increment('dislikes', { where: { id: postId } });
      } else if (interaction_type === 'dislike') {
        await existingInteraction.update({ interaction_type: 'like' });
        await Post.increment('likes', { where: { id: postId } });
        await Post.decrement('dislikes', { where: { id: postId } });
      } else {
        // If the interaction_type is 'neutral', toggle the like/dislike based on user input
        const { like, dislike } = req.body;
        let likes = like ? 1 : 0;
        let dislikes = dislike ? 1 : 0;

        await existingInteraction.update({ interaction_type: like ? 'like' : 'dislike' });
        await Post.increment('likes', { by: likes, where: { id: postId } });
        await Post.increment('dislikes', { by: dislikes, where: { id: postId } });
      }
    }

    const updatedPost = await Post.findByPk(postId);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
