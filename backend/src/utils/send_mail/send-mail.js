const nodemailer = require('nodemailer');

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'keshaun.friesen@ethereal.email',
      pass: 'nfyQtr9BAHrZcPFFdU'
    }
  });
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
