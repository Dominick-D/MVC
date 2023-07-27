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

// Like a post
router.put('/like/:id', withAuth, async (req, res) => {
  try {
    const existingInteraction = await UserPostInteraction.findOne({
      where: {
        user_id: req.session.user_id,
        post_id: req.params.id,
      },
    });

    if (existingInteraction) {
      if (existingInteraction.interaction_type === 'like') {
        await existingInteraction.update({ interaction_type: 'neutral' });
        await Post.decrement('likes', { where: { id: req.params.id } });
      } else {
        await existingInteraction.update({ interaction_type: 'like' });
        if (existingInteraction.interaction_type === 'dislike') {
          await Post.increment('likes', { where: { id: req.params.id } });
          await Post.decrement('dislikes', { where: { id: req.params.id } });
        } else {
          await Post.increment('likes', { where: { id: req.params.id } });
        }
      }
    } else {
      await UserPostInteraction.create({
        user_id: req.session.user_id,
        post_id: req.params.id,
        interaction_type: 'like',
      });
      await Post.increment('likes', { where: { id: req.params.id } });
    }

    const updatedPost = await Post.findByPk(req.params.id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dislike a post
router.put('/dislike/:id', withAuth, async (req, res) => {
  try {
    const existingInteraction = await UserPostInteraction.findOne({
      where: {
        user_id: req.session.user_id,
        post_id: req.params.id,
      },
    });

    if (existingInteraction) {
      if (existingInteraction.interaction_type === 'dislike') {
        await existingInteraction.update({ interaction_type: 'neutral' });
        await Post.increment('dislikes', { where: { id: req.params.id } });
      } else {
        await existingInteraction.update({ interaction_type: 'dislike' });
        if (existingInteraction.interaction_type === 'like') {
          await Post.decrement('likes', { where: { id: req.params.id } });
          await Post.increment('dislikes', { where: { id: req.params.id } });
        } else {
          await Post.increment('dislikes', { where: { id: req.params.id } });
        }
      }
    } else {
      await UserPostInteraction.create({
        user_id: req.session.user_id,
        post_id: req.params.id,
        interaction_type: 'dislike',
      });
      await Post.increment('dislikes', { where: { id: req.params.id } });
    }

    const updatedPost = await Post.findByPk(req.params.id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
