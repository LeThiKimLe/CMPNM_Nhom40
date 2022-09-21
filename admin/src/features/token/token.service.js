const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshtoken');
  return refreshToken;
};
const getLocalAccessToken = () => {
  const accessToken = localStorage.getItem('accesstoken');
  return accessToken;
};

const updateLocalAccessToken = (token) => {
  localStorage.setItem('accesstoken', token);
};

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const setUser = (user) => {
  console.log(JSON.stringify(user));
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
