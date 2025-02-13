// routes/quiz.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.get('/', isAuthenticated, quizController.getQuizzes);
router.get('/:id', isAuthenticated, quizController.getQuiz);
router.post('/submit', isAuthenticated, quizController.submitQuiz);
router.get('/result/:id', isAuthenticated, quizController.getQuizResult);
router.post('/create', isAdmin, quizController.createQuiz);

module.exports = router;