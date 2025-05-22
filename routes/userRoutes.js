const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.get('/me', auth, userController.getUserProfile);
router.put('/:id', auth, userController.updateUserProfile);
router.patch('/me', auth, userController.updateUserEmail);


module.exports = router;