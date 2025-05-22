const express = require('express');
const { getRandomQuestions, addQuestion } = require('../controllers/questionController');

const router = express.Router();

router.get('/random', getRandomQuestions);
router.post('/', addQuestion); // New route to add question

module.exports = router;
