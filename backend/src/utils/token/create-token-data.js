/* eslint-disable no-underscore-dangle */
const createTokenUser = (user) => ({
  firstName: user.firstName,
  userId: user._id,
  roles: user.roles,
});

module.exports = createTokenUser;
