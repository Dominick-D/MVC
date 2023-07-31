const router = require('express').Router();
const { UserPostInteraction, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.session.user_id;
        let action = req.body.action; // action: 'like', 'dislike', 'neutral'

        const existingInteraction = await UserPostInteraction.findOne({
            where: {
                user_id: userId,
                post_id: postId,
            },
        });

        if (existingInteraction) {
            // If the action is the same as the previous, toggle to neutral
            if (existingInteraction.interaction_type === action) {
                action = 'neutral';
            }

            existingInteraction.interaction_type = action;
            await existingInteraction.save();
        } else {
            // If no interaction exists, create a new one
            await UserPostInteraction.create({
                user_id: userId,
                post_id: postId,
                interaction_type: action,
            });
        }

        const post = await Post.findByPk(postId);

        // Update post's likes/dislikes count
        const likes = await UserPostInteraction.count({
            where: { post_id: postId, interaction_type: 'like' }
        });

        let dislikes;
        if (action === 'dislike') {
            dislikes = await UserPostInteraction.count({
                where: { post_id: postId, interaction_type: 'dislike' }
            });
        } else {
            dislikes = 0; // Set dislikes to zero when action is 'neutral'
        }

        post.likes = likes;
        post.dislikes = dislikes;
        post.likeDislikeSum = likes - dislikes;
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
