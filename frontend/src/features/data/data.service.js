import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';

const getAllAPI = createAsyncThunk('/get-all-data', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/get-all-data');
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const dataThunk = {
  getAllAPI,
};

export default dataThunk;
