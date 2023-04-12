const sendEmail = require('./send-mail');

const sendResetPasswordEmail = async ({
  firstName,
  email,
  passwordToken,
  origin,
}) => {
  const resetPasswordLink = `${origin}/reset-password?passwordToken=${passwordToken}&email=${email}`;
  const message = `<p>Please reset your password by clicking on the following link : 
  <a href="${resetPasswordLink}">Reset password</a> </p>`;
  sendEmail({
    to: email,
    subject: 'Reset password Confirmation',
    html: `<h4> Hello, ${firstName}</h4>
${message}
`,
  });
};
module.exports = sendResetPasswordEmail;
