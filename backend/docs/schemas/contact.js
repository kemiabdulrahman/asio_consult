module.exports = {
  ContactMessage: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Unique message identifier' },
      name: { type: 'string', description: 'Sender name' },
      email: { type: 'string', format: 'email', description: 'Sender email' },
      phone: { type: 'string', description: 'Sender phone number (optional)' },
      subject: { type: 'string', description: 'Message subject' },
      message: { type: 'string', description: 'Message content' },
      isRead: { type: 'boolean', description: 'Whether message has been read' },
      createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' }
    },
    required: ['id', 'name', 'email', 'subject', 'message']
  }
};
