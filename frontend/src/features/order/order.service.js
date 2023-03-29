import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';
import axios from 'axios';

const addOrderAPI = createAsyncThunk(
  'add-order',
  async (orderData, thunkAPI) => {
    try {
      //
      const response = await axiosClient.post(
        '/order/add-item',
        JSON.stringify({ data: orderData })
      );
      console.log(response);
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

const getAllOrder = createAsyncThunk('get-all-order', async (thunkAPI) => {
  try {
    //
    const response = await axiosClient.get('/order/get-all');
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
    const response = await axiosClient.get(`/order/get-order/${orderId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const paymentWithMomo = createAsyncThunk(
  'payment-with-momo',
  async (orderMomoData, thunkAPI) => {
    console.log(orderMomoData);
    try {
      const response = await axiosClient.post(
        '/order/momo',
        JSON.stringify({ data: orderMomoData })
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
  addOrderAPI,
  getAllOrder,
  getOrder,
  paymentWithMomo,
};
export default orderThunk;
