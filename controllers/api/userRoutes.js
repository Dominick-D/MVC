const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/latest', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    

    if (!userData) {
      res.status(404).json({ message: 'No user found' });
      return;
    }

    res.json(userData);

  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      console.log(req.session.logged_in);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout',  withAuth, async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/update-password', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    if (!userData.validPassword(req.body.currentPassword)) {
      res.status(400).json({ message: 'Current password is incorrect' });
      return;
    }

    await User.update(
      { password: req.body.newPassword },
      { where: { id: req.session.user_id } }
    );

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
