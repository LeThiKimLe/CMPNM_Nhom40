import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const getColorAllByCategoryAPI = createAsyncThunk('admin/get-color', async (id, thunkAPI) => {
  try {
    const response = await axiosClient.get(`/admin/get-colors/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const colorThunk = {
  getColorAllByCategoryAPI,
};

export default colorThunk;
