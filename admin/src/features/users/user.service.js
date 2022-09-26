import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const uploadImageAPI = createAsyncThunk('admin/user/upload-image', async (picture, thunkAPI) => {
  try {
    const response = await axiosClient.post('/admin/user/upload-image', JSON.stringify({ data: picture }));
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const userThunk = {
  uploadImageAPI,
};

export default userThunk;
