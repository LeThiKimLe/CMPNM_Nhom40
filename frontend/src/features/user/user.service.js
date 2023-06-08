import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';
import TokenService from '../token/token.service';
import { create } from 'lodash';

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
    const response = await axiosClient.post('/sign-in', userData);
    localStorage.setItem('accesstoken', response.data.accessToken);
    TokenService.setUser(response.data.userData);
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
    console.log(phrase);
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
    console.log('chay');
    try {
      const response = await axiosClient.post(
        '/get-products',
        JSON.stringify({ data: searchModel })
      );
      console.log(response.data);
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
};

export default userThunk;
