const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.patch('/update-password', auth, authController.updatePassword);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleSuccess);

// Apple login placeholder
router.post('/apple-login', (req, res) => {
  res.status(501).json({ msg: 'Apple login not implemented yet' });
});

module.exports = router;
