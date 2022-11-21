import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const getAllOrder = createAsyncThunk('get-all-order', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/admin/get-all-order');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const getOrder = createAsyncThunk('get-order', async (orderId, thunkAPI) => {
  try {
    //
    const response = await axiosClient.get(`/admin/get-order/${orderId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const updateOrderStatus = createAsyncThunk(
  'update-order-status',
  async (orderData, thunkAPI) => {
    try {
      //
      const response = await axiosClient.post(
        `/admin/update-order-status`,
        JSON.stringify({ data: orderData })
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
const orderThunk = {
  getAllOrder,
  getOrder,
  updateOrderStatus,
};
export default orderThunk;
