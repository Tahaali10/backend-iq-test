const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../controllers/privacyPolicyController');

// POST create new privacy policy
router.post('/', privacyPolicyController.createPrivacyPolicy);

// GET active privacy policy (most recent non-deleted)
router.get('/', privacyPolicyController.getActivePrivacyPolicy);

module.exports = router;
