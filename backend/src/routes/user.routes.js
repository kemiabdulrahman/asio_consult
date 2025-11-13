const express = require('express');
const UserController = require('../controllers/user.controller');
const { authenticateUser } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes (no auth required)
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected routes (auth required)
router.get('/profile', authenticateUser, UserController.getProfile);
router.put('/profile', authenticateUser, UserController.updateProfile);
router.post('/change-password', authenticateUser, UserController.changePassword);
router.get('/:id', authenticateUser, UserController.getUserById);

module.exports = router;
