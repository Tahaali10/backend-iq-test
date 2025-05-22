// routes/faqRoutes.js
const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.get('/', faqController.getFaqs);
router.post('/', faqController.createFaq);

module.exports = router;
