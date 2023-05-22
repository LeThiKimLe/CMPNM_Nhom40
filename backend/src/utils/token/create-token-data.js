/* eslint-disable no-underscore-dangle */
const createTokenUser = (user) => ({
  firstName: user.firstName,
  userId: user._id,
  roles: user.roles,
  email: user.email,
});

module.exports = createTokenUser;
