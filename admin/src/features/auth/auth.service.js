import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';
const signinAPIThunk = createAsyncThunk('admin/signin', async (userData, thunkAPI) => {
  try {
    const response = await axiosClient.post('/admin/signin', userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const showProfileAPIThunk = createAsyncThunk('admin/show-profile', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/admin/refresh-token', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export { signinAPIThunk, showProfileAPIThunk };
