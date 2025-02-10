// models/Quiz.js
const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }],
  timeLimit: Number
});

module.exports = mongoose.model('Quiz', QuizSchema);