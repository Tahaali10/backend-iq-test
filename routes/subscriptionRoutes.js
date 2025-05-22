const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// GET /api/subscriptions
router.get('/', subscriptionController.getAllSubscriptions);
router.post('/', subscriptionController.createSubscription);

module.exports = router;
