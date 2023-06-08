import axios from 'axios';
import TokenService from '../features/token/token.service';
const API_URL = 'http://localhost:3000/api';
const token = TokenService.getLocalAccessToken();
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
});
axiosClient.interceptors.request.use((req) => {
  const token = TokenService.getLocalAccessToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
axiosClient.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const id = TokenService.getUser().userId;
      const res = await axiosClient.post('/refresh-token', {
        userId: id,
      });

      const { accessToken } = res.data;
      console.log(accessToken);
      localStorage.setItem('accesstoken', accessToken);
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
