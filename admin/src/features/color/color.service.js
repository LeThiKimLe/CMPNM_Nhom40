import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const getColorAllByCategoryAPI = createAsyncThunk('admin/get-colors', async (id, thunkAPI) => {
  try {
    const response = await axiosClient.get(`/color/get-colors/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const addColorAPI = createAsyncThunk('admin/add-color', async (colorData, thunkAPI) => {
  try {
    const response = await axiosClient.post(`/color/add-color`, JSON.stringify({ data: colorData }));
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const colorThunk = {
  getColorAllByCategoryAPI,
  addColorAPI,
};

export default colorThunk;
