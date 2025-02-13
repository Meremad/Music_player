const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

// Панель администратора
router.get('/', isAdmin, adminController.getAdminPanel);
router.get('/users', isAdmin, adminController.getUsers);
router.get('/posts', isAdmin, adminController.getPosts);

// Управление элементами
router.get('/main-page-items', isAdmin, adminController.getMainPageItems);
router.post('/main-page-items', isAdmin, adminController.createMainPageItem);
router.put('/main-page-items/:id', isAdmin, adminController.updateMainPageItem);
router.delete('/main-page-items/:id', isAdmin, adminController.deleteMainPageItem);

module.exports = router;
