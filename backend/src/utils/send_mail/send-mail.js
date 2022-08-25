const nodemailer = require('nodemailer');
const config = require('./config');

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
