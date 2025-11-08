const ContactService = require('../services/contact.service');
const { successResponse, errorResponse } = require('../utils/response');

class ContactController {
  async createMessage(req, res) {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return errorResponse(res, 'Name, email, subject and message are required', 400);
      }

      const contactMessage = await ContactService.createContactMessage({
        name,
        email,
        phone,
        subject,
        message
      });

      return successResponse(res, contactMessage, 'Message sent successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async getMessages(req, res) {
    try {
      const messages = await ContactService.getAllMessages();
      return successResponse(res, messages, 'Messages retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const message = await ContactService.markAsRead(id);
      return successResponse(res, message, 'Message marked as read');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async deleteMessage(req, res) {
    try {
      const { id } = req.params;
      await ContactService.deleteMessage(id);
      return successResponse(res, null, 'Message deleted successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new ContactController();