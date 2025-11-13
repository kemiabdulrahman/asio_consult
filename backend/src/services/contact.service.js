const prisma = require('../config/db');
const { sendContactEmail } = require('../utils/email');

class ContactService {
  async createContactMessage(messageData) {
    if (!messageData.name || !messageData.email || !messageData.subject || !messageData.message) {
      throw new Error('Missing required fields: name, email, subject, message');
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone || null,
        subject: messageData.subject,
        message: messageData.message,
        isRead: false
      }
    });

    // Send email notification to admin
    try {
      await sendContactEmail(messageData);
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
      // Don't throw - message is already created
    }

    return message;
  }

  async getAllMessages(filters = {}) {
    const { isRead, search } = filters;
    const where = {};
    if (isRead !== undefined) where.isRead = isRead === 'true' || isRead === true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } }
      ];
    }
    // Add pagination
    const take = filters.take ? parseInt(filters.take) : 20;
    const skip = filters.skip ? parseInt(filters.skip) : 0;
    return await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take,
      skip
    });
  }

  async getMessageById(id) {
    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });

    if (!message) {
      throw new Error('Message not found');
    }

    return message;
  }

  async markAsRead(id) {
    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });

    if (!message) {
      throw new Error('Message not found');
    }

    return await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
  }

  async markAsUnread(id) {
    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });

    if (!message) {
      throw new Error('Message not found');
    }

    return await prisma.contactMessage.update({
      where: { id },
      data: { isRead: false }
    });
  }

  async markMultipleAsRead(ids) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('ids must be a non-empty array');
    }

    return await prisma.contactMessage.updateMany({
      where: { id: { in: ids } },
      data: { isRead: true }
    });
  }

  async deleteMessage(id) {
    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });

    if (!message) {
      throw new Error('Message not found');
    }

    return await prisma.contactMessage.delete({
      where: { id }
    });
  }

  async deleteMultipleMessages(ids) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('ids must be a non-empty array');
    }

    return await prisma.contactMessage.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async getUnreadMessagesCount() {
    return await prisma.contactMessage.count({
      where: { isRead: false }
    });
  }
}

module.exports = new ContactService();