import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const createAPI = createAsyncThunk(
  'color/create',
  async (colorData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/color/',
        JSON.stringify({ data: colorData })
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

const getAllAPI = createAsyncThunk('/color/get-all', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/color/');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const colorThunk = {
  createAPI,
  getAllAPI,
};
export default colorThunk;
