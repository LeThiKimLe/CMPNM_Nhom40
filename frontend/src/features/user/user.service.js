import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';

const signupAPI = createAsyncThunk('signup', async (userData, thunkAPI) => {
  try {
    const response = await axiosClient.post('/sign-up', userData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const signinAPI = createAsyncThunk('signin', async (userData, thunkAPI) => {
  try {
    const response = await axiosClient.post('/sign-in', userData, {
      withCredentials: true,
    });

    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getProductAPI = createAsyncThunk(
  '/get-product',
  async (data, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/get-product/${data}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const searchProductAPI = createAsyncThunk(
  '/search-product',
  async (phrase, thunkAPI) => {
    try {
      const response = await axiosClient.get('/search-product', {
        params: {
          phrase,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const showProfileAPI = createAsyncThunk('/get-profile', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/get-profile', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const verifyEmailAPI = createAsyncThunk(
  '/verify-email',
  async (verifyData, thunkAPI) => {
    try {
      const response = await axiosClient.post('/verify-email', verifyData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const reSendVerifyEmailAPI = createAsyncThunk(
  '/resend-verify-email',
  async (verifyData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/resend-verify-email',
        JSON.stringify({ data: verifyData }),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const cancelOrderAPI = createAsyncThunk(
  '/cancel-order',
  async (orderData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/cancel-order',
        JSON.stringify({ data: orderData }),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const getDataUserAPI = createAsyncThunk('/get-data-user', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/get-data-user', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const getProductsOptionAPI = createAsyncThunk(
  '/get-products',
  async (searchModel, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/get-products',
        JSON.stringify({ data: searchModel })
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const changePasswordAPI = createAsyncThunk(
  '/changePassword',
  async (passwordData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/change-password',
        JSON.stringify({ data: passwordData }),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const createReviewAPI = createAsyncThunk(
  '/create-review',
  async (reviewData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/create-review',
        JSON.stringify({ data: reviewData })
      );
      console.log(response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const getReviewAPI = createAsyncThunk(
  '/get-review',
  async (productid, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/get-review/${productid}`);
      console.log(response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const checkTokenAPI = createAsyncThunk(
  '/check-token',
  async (tokenData, thunkAPI) => {
    try {
      console.log(tokenData);
      const response = await axiosClient.post(
        '/check-token',
        JSON.stringify({ data: tokenData }),
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const reSendTokenAPI = createAsyncThunk(
  '/re-send-token',
  async (userId, thunkAPI) => {
    try {
      console.log(userId);
      const response = await axiosClient.post(
        '/refresh-token',
        JSON.stringify({ data: userId }),
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userThunk = {
  signinAPI,
  showProfileAPI,
  signupAPI,
  verifyEmailAPI,
  changePasswordAPI,
  reSendVerifyEmailAPI,
  cancelOrderAPI,
  getDataUserAPI,
  getProductsOptionAPI,
  searchProductAPI,
  getProductAPI,
  createReviewAPI,
  getReviewAPI,
  reSendTokenAPI,
  checkTokenAPI,
};

export default userThunk;
