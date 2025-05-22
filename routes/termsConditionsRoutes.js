const express = require('express');
const router = express.Router();
const termsController = require('../controllers/termsConditionController');

// POST - Create Terms
router.post('/', termsController.createTerms);

// GET - Fetch latest active Terms
router.get('/', termsController.getLatestTerms);

module.exports = router;
