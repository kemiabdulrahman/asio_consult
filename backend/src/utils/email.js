const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
  host: config.SMTP.HOST,
  port: config.SMTP.PORT,
  secure: false,
  auth: {
    user: config.SMTP.USER,
    pass: config.SMTP.PASS
  }
});

const sendContactEmail = async (contactData) => {
  const mailOptions = {
    from: config.SMTP.USER,
    to: config.ADMIN_EMAIL,
    subject: `New Contact Message: ${contactData.subject}`,
    html: `
      <h3>New Contact Message from ASIO CONSULT Website</h3>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `
  };

  return await transporter.sendMail(mailOptions);
};

const sendOrderConfirmation = async (orderData) => {
  const mailOptions = {
    from: config.SMTP.USER,
    to: orderData.customerEmail,
    subject: 'Order Confirmation - ASIO CONSULT',
    html: `
      <h3>Thank you for your order!</h3>
      <p>Dear ${orderData.customerName},</p>
      <p>We have received your order and will contact you shortly for confirmation.</p>
      <p><strong>Order Total:</strong> ₦${orderData.total.toLocaleString()}</p>
      <p>Best regards,<br>ASIO CONSULT Team</p>
    `
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactEmail,
  sendOrderConfirmation
};