import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';
import TokenService from '../token/token.service';
const signinAPI = createAsyncThunk(
  'admin/signin',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post('/admin/signin', userData);
      localStorage.setItem('accesstoken', response.data.accessToken);
      TokenService.setUser(response.data.adminData);
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

const showProfileAPI = createAsyncThunk(
  'admin/show-profile',
  async (thunkAPI) => {
    try {
      const response = await axiosClient.get('/admin/refresh-token', {
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
const getAllDataAPI = createAsyncThunk(
  'admin/get-all-data',
  async (thunkAPI) => {
    try {
      const response = await axiosClient.get('/admin/get-all-data', {
        withCredentials: true,
      });
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
const authThunk = {
  signinAPI,
  showProfileAPI,
  getAllDataAPI,
};

export default authThunk;
