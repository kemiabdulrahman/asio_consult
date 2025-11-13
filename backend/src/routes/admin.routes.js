const express = require('express');
const AdminController = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/login', AdminController.login);

// Protected routes
router.post('/create', authenticateAdmin, AdminController.createAdmin);
router.get('/dashboard', authenticateAdmin, AdminController.getDashboardStats);

module.exports = router;