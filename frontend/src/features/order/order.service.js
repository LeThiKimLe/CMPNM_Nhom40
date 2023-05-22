import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';

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

const addOrderPaypalAPI = createAsyncThunk(
  'add-order-paypal',
  async (orderData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/order/add-paypal',
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

const paymentWithPaypal = createAsyncThunk(
  'payment-with-paypal',
  async (orderData, thunkAPI) => {
    console.log(orderData);
    try {
      const response = await axiosClient.post(
        '/order/paypal',
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

const paymentPaypalSuccess = createAsyncThunk(
  'payment-paypal-success',
  async (queryData, thunkAPI) => {
    console.log(queryData);
    try {
      const {
        paymentId,
        PayerID,
        shipping,
        total,
        shipping_discount,
        subtotal,
      } = queryData;
      const response = await axiosClient.get(
        `/order/success?paymentId=${paymentId}&payerId=${PayerID}&total=${total}&shipping=${shipping}&shipping_discount=${shipping_discount}&subtotal=${subtotal}`
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

const checkResponseMomo = createAsyncThunk(
  'check-response-momo',
  async (orderResponse, thunkAPI) => {
    console.log(orderResponse);
    try {
      const response = await axiosClient.post(
        '/order/checkResponse',
        JSON.stringify({ data: orderResponse })
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
  paymentWithPaypal,
  addOrderAPI,
  getAllOrder,
  getOrder,
  paymentWithMomo,
  paymentPaypalSuccess,
  addOrderPaypalAPI,
  checkResponseMomo,
};
export default orderThunk;
