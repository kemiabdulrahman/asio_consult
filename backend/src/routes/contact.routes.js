const express = require('express');
const ContactController = require('../controllers/contact.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/', ContactController.createMessage);

// Admin routes
router.get('/', authenticateAdmin, ContactController.getMessages);
router.patch('/:id/read', authenticateAdmin, ContactController.markAsRead);
router.delete('/:id', authenticateAdmin, ContactController.deleteMessage);

module.exports = router;