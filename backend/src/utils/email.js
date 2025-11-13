const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
  host: config.SMTP.HOST,
  port: config.SMTP.PORT,
  secure: config.SMTP.PORT === 465, // true for 465, false for other ports
  auth: {
    user: config.SMTP.USER,
    pass: config.SMTP.PASS
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

const sendContactEmail = async (contactData) => {
  try {
    const mailOptions = {
      from: `"ASIO CONSULT" <${config.SMTP.USER}>`,
      to: config.ADMIN_EMAIL,
      subject: `New Contact Message: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2c3e50; color: white; padding: 20px;">
            <h2 style="margin: 0;">New Contact Message from ASIO CONSULT Website</h2>
          </div>
          <div style="padding: 20px;">
            <p><strong>Name:</strong> ${escapeHtml(contactData.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>Phone:</strong> ${contactData.phone ? escapeHtml(contactData.phone) : 'Not provided'}</p>
            <p><strong>Subject:</strong> ${escapeHtml(contactData.subject)}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(contactData.message).replace(/\n/g, '<br>')}</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>This email was automatically generated from the ASIO CONSULT contact form.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

const sendOrderConfirmation = async (orderData) => {
  try {
    // Format items into readable list
    const itemsList = Array.isArray(orderData.items)
      ? orderData.items
          .map(
            (item) =>
              `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(item.name)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₦${parseFloat(item.price).toLocaleString('en-NG')}</td>
          </tr>`
          )
          .join('')
      : '';

    const mailOptions = {
      from: `"ASIO CONSULT" <${config.SMTP.USER}>`,
      to: orderData.customerEmail,
      subject: `Order Confirmation - ASIO CONSULT [${orderData.orderNumber}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2c3e50; color: white; padding: 20px;">
            <h2 style="margin: 0;">Order Confirmation</h2>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Order Number: ${orderData.orderNumber}</p>
          </div>
          <div style="padding: 20px;">
            <p>Dear ${escapeHtml(orderData.customerName)},</p>
            <p>Thank you for your order! We have received it and will process it shortly.</p>
            
            <h3 style="margin-top: 30px; color: #2c3e50;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>

            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; display: flex; justify-content: space-between;">
                <strong>Order Total:</strong>
                <strong style="color: #27ae60; font-size: 18px;">₦${parseFloat(orderData.total).toLocaleString('en-NG')}</strong>
              </p>
            </div>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              We will send you a tracking number once your order is shipped. If you have any questions, please don't hesitate to contact us.
            </p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
            <p style="margin: 0;">© 2025 ASIO CONSULT. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">
              <a href="https://asioconsult.com" style="color: #2c3e50; text-decoration: none;">Visit our website</a>
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

const sendOrderShippedEmail = async (orderData) => {
  try {
    const mailOptions = {
      from: `"ASIO CONSULT" <${config.SMTP.USER}>`,
      to: orderData.customerEmail,
      subject: `Your Order Has Been Shipped - ASIO CONSULT [${orderData.orderNumber}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #27ae60; color: white; padding: 20px;">
            <h2 style="margin: 0;">Your Order Has Been Shipped!</h2>
          </div>
          <div style="padding: 20px;">
            <p>Dear ${escapeHtml(orderData.customerName)},</p>
            <p>Great news! Your order has been shipped and is on its way to you.</p>
            
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #27ae60;">
              <p style="margin: 0;">
                <strong>Tracking Number:</strong> ${orderData.trackingNumber}<br>
                <strong>Carrier:</strong> ${orderData.carrier}<br>
                <strong>Estimated Delivery:</strong> ${new Date(orderData.estimatedDeliveryDate).toLocaleDateString('en-NG')}
              </p>
            </div>

            <p>You can track your shipment using the tracking number above.</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
            <p style="margin: 0;">© 2025 ASIO CONSULT. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order shipped email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending order shipped email:', error);
    throw error;
  }
};

// Utility function to escape HTML to prevent XSS
const escapeHtml = (text) => {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

module.exports = {
  sendContactEmail,
  sendOrderConfirmation,
  sendOrderShippedEmail
};