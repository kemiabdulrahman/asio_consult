const ContactService = require('../services/contact.service');
const { successResponse, errorResponse } = require('../utils/response');

class ContactController {
  static async createMessage(req, res) {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return errorResponse(res, 'Missing required fields: name, email, subject, message', 400);
      }

      const messageData = {
        name,
        email,
        phone: phone || null,
        subject,
        message
      };

      const newMessage = await ContactService.createContactMessage(messageData);

      return successResponse(res, 'Message sent successfully', newMessage, 201);
    } catch (error) {
      console.error('Create contact message error:', error);
      return errorResponse(res, error.message || 'Failed to send message', 500);
    }
  }

  static async getMessages(req, res) {
    try {
      const { isRead, search } = req.query;

      const messages = await ContactService.getAllMessages({
        isRead,
        search
      });

      return successResponse(res, 'Messages retrieved successfully', messages, 200);
    } catch (error) {
      console.error('Get messages error:', error);
      return errorResponse(res, 'Failed to fetch messages', 500);
    }
  }

  static async getMessageById(req, res) {
    try {
      const { id } = req.params;

      const message = await ContactService.getMessageById(id);

      return successResponse(res, 'Message retrieved successfully', message, 200);
    } catch (error) {
      console.error('Get message by id error:', error);

      if (error.message === 'Message not found') {
        return errorResponse(res, 'Message not found', 404);
      }

      return errorResponse(res, 'Failed to fetch message', 500);
    }
  }

  static async markAsRead(req, res) {
    try {
      const { id } = req.params;

      const message = await ContactService.markAsRead(id);

      return successResponse(res, 'Message marked as read', message, 200);
    } catch (error) {
      console.error('Mark as read error:', error);

      if (error.message === 'Message not found') {
        return errorResponse(res, 'Message not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to mark message as read', 500);
    }
  }

  static async markAsUnread(req, res) {
    try {
      const { id } = req.params;

      const message = await ContactService.markAsUnread(id);

      return successResponse(res, 'Message marked as unread', message, 200);
    } catch (error) {
      console.error('Mark as unread error:', error);

      if (error.message === 'Message not found') {
        return errorResponse(res, 'Message not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to mark message as unread', 500);
    }
  }

  static async markMultipleAsRead(req, res) {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return errorResponse(res, 'ids must be a non-empty array', 400);
      }

      const result = await ContactService.markMultipleAsRead(ids);

      return successResponse(res, 'Messages marked as read', result, 200);
    } catch (error) {
      console.error('Mark multiple as read error:', error);
      return errorResponse(res, error.message || 'Failed to mark messages as read', 500);
    }
  }

  static async deleteMessage(req, res) {
    try {
      const { id } = req.params;

      const result = await ContactService.deleteMessage(id);

      return successResponse(res, 'Message deleted successfully', result, 200);
    } catch (error) {
      console.error('Delete message error:', error);

      if (error.message === 'Message not found') {
        return errorResponse(res, 'Message not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to delete message', 500);
    }
  }

  static async deleteMultipleMessages(req, res) {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return errorResponse(res, 'ids must be a non-empty array', 400);
      }

      const result = await ContactService.deleteMultipleMessages(ids);

      return successResponse(res, 'Messages deleted successfully', result, 200);
    } catch (error) {
      console.error('Delete multiple messages error:', error);
      return errorResponse(res, error.message || 'Failed to delete messages', 500);
    }
  }

  static async getUnreadCount(req, res) {
    try {
      const count = await ContactService.getUnreadMessagesCount();

      return successResponse(res, 'Unread count retrieved', { unreadCount: count }, 200);
    } catch (error) {
      console.error('Get unread count error:', error);
      return errorResponse(res, 'Failed to fetch unread count', 500);
    }
  }
}

module.exports = ContactController;