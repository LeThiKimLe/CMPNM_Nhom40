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

// Add a response interceptor
axiosClient.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    if (originalConfig.url !== '/signin' && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosClient.post('/refresh-token', {
            userId: TokenService.getUser().userId,
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return axiosClient(originalConfig);
        } catch (_error) {
          TokenService.removeData();
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
