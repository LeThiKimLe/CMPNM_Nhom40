const sendEmail = require('./send-mail');

const sendVerificationEmail = async ({
  firstName,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please verify your account by clicking the link: 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${firstName}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
