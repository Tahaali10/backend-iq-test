const express = require('express');
const {
  saveResult,
  getResult
} = require('../controllers/resultController');

const router = express.Router();

router.route('/')
  .post(saveResult);

router.route('/:id')
  .get(getResult);

module.exports = router;