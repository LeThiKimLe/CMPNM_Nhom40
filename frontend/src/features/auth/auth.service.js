import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';
import TokenService from '../token/token.service';
const signinAPI = createAsyncThunk('signin', async (userData, thunkAPI) => {
  try {
    const response = await axiosClient.post('/signin', userData);
    localStorage.setItem('accesstoken', response.data.accessToken);
    TokenService.setUser(response.data.adminData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const showProfileAPI = createAsyncThunk('/refresh-token', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/refresh-token', {
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
const authThunk = {
  signinAPI,
  showProfileAPI,
};

export default authThunk;
