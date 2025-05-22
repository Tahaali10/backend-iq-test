const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  lang: { type: String, required: true },
  question_type: { type: String, required: true },
  question: {
    text: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  active: { type: Boolean, default: true },
  answer: { type: String, required: true },
  options: {
    a: {
      text: { type: String, default: '' },
      image: { type: String, default: '' }
    },
    b: {
      text: { type: String, default: '' },
      image: { type: String, default: '' }
    },
    c: {
      text: { type: String, default: '' },
      image: { type: String, default: '' }
    },
    d: {
      text: { type: String, default: '' },
      image: { type: String, default: '' }
    },
    e: {
      text: { type: String, default: '' },
      image: { type: String, default: '' }
    },
    f: {
      text: { type: String, default: '' },
      image: { type: String, default: '' }
    }
  },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  points: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);