import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const createAPI = createAsyncThunk(
  'banner/create',
  async (bannerData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/banner/create',
        JSON.stringify({ data: bannerData })
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

const getAllAPI = createAsyncThunk('/banner/get-all', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/banner');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const bannerThunk = {
  createAPI,
  getAllAPI,
};
export default bannerThunk;
