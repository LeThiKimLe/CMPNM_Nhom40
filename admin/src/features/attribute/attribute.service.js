import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const createAPI = createAsyncThunk(
  'attribute/create',
  async (attributeData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/attribute/',
        JSON.stringify({ data: attributeData })
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

const getAllAPI = createAsyncThunk('/attribute/get-all', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/attribute/');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const attributeThunk = {
  createAPI,
  getAllAPI,
};
export default attributeThunk;
