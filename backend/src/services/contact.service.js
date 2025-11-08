const prisma = require('../config/db');
const { sendContactEmail } = require('../utils/email');

class ContactService {
  async createContactMessage(messageData) {
    const message = await prisma.contactMessage.create({
      data: messageData
    });

    // Send email notification
    try {
      await sendContactEmail(messageData);
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
    }

    return message;
  }

  async getAllMessages() {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async markAsRead(id) {
    return await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
  }

  async deleteMessage(id) {
    return await prisma.contactMessage.delete({
      where: { id }
    });
  }
}

module.exports = new ContactService();