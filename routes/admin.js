const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

router.get('/', isAdmin, adminController.getAdminPanel);
router.delete('/users/:id', isAdmin, adminController.deleteUser);

module.exports = router;