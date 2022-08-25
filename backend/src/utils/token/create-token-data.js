/* eslint-disable no-underscore-dangle */
const createTokenUser = (user) => {
  if (user.isAdmin) {
    return {
      firstName: user.firstName,
      userId: user._id,
      isAdmin: true,
    };
  }
  return {
    firstName: user.firstName,
    userId: user._id,
    role: user.role_id,
  };
};

module.exports = createTokenUser;
