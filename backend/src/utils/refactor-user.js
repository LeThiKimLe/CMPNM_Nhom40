const refactorUser = (user) => ({
  fullName: user.fullName,
  // eslint-disable-next-line no-underscore-dangle
  userId: user._id,
  role_id: user.role_id,
  isAdmin: user.isAdmin,
});

module.exports = refactorUser;
