const express = require('express');
const ContactController = require('../controllers/contact.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/', ContactController.createMessage);

// Admin routes
router.get('/', authenticateAdmin, ContactController.getMessages);
router.get('/unread/count', authenticateAdmin, ContactController.getUnreadCount);
router.get('/:id', authenticateAdmin, ContactController.getMessageById);
router.patch('/:id/read', authenticateAdmin, ContactController.markAsRead);
router.patch('/:id/unread', authenticateAdmin, ContactController.markAsUnread);
router.patch('/read/bulk', authenticateAdmin, ContactController.markMultipleAsRead);
router.delete('/:id', authenticateAdmin, ContactController.deleteMessage);
router.delete('/bulk/delete', authenticateAdmin, ContactController.deleteMultipleMessages);

module.exports = router;