const sendEmail = require('./send-mail');

const sendVerificationEmail = async ({
  firstName,
  email,
  verificationToken,
}) => {
  const verifyEmail = `http://localhost:3002/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Vui lòng click vào link dưới đây để kích hoạt tài khoản: 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  sendEmail({
    to: email,
    subject: 'Xác nhận tài khoản',
    html: `<h4> Hello, ${firstName}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
