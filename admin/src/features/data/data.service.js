import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const getAllDataAPI = createAsyncThunk(
  'admin/get-all-data',
  async (thunkAPI) => {
    try {
      const response = await axiosClient.get('/admin/get-all-data', {
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

const dataThunk = {
  getAllDataAPI,
};

export default dataThunk;
