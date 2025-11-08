const express = require('express');
const AdminController = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/login', AdminController.login);

// Protected routes
router.get('/dashboard', authenticateAdmin, AdminController.getDashboardStats);
router.post('/create', authenticateAdmin, AdminController.createAdmin);

module.exports = router;