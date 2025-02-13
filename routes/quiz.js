const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Отображение бонусного квиза по адресу: /quiz/bonus
router.get('/bonus', quizController.getQuiz);

router.post('/', quizController.createQuiz);
// Обработка отправки квиза по адресу: /quiz/submit
router.post('/submit', quizController.submitQuiz);

module.exports = router;
