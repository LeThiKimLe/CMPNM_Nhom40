import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const createUserAPI = createAsyncThunk('admin/create-user', async (userData, thunkAPI) => {
  try {
    const response = await axiosClient.post('/admin/create-user', JSON.stringify({ data: userData }));
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const userThunk = {
  createUserAPI,
};

export default userThunk;
