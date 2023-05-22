import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';

const addToCartAPI = createAsyncThunk(
  'add-to-cart',
  async (cartData, thunkAPI) => {
    try {
      //
      const response = await axiosClient.post(
        '/cart/add-item',
        JSON.stringify({ data: cartData })
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
const addLocalToCartAPI = createAsyncThunk(
  'add-local-to-cart',
  async (cartData, thunkAPI) => {
    try {
      //
      const response = await axiosClient.post(
        '/cart/add-items-local',
        JSON.stringify({ data: cartData })
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
const updateCartItemAPI = createAsyncThunk(
  'update-cart-item',
  async (cartData, thunkAPI) => {
    try {
      //
      const response = await axiosClient.post(
        '/cart/update-cart-item',
        JSON.stringify({ data: cartData })
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
const getAllItemsAPI = createAsyncThunk(
  'cart/get-all-items',
  async (thunkAPI) => {
    try {
      //
      const response = await axiosClient.get('/cart/get-all-items');
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
const deleteCartItemAPI = createAsyncThunk(
  'cart/delete-item-cart',
  async (productId, thunkAPI) => {
    try {
      console.log(productId);
      const response = await axiosClient.post(
        '/cart/delete-item',
        JSON.stringify({ data: productId })
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
const cartThunk = {
  addToCartAPI,
  getAllItemsAPI,
  addLocalToCartAPI,
  deleteCartItemAPI,
  updateCartItemAPI,
};

export default cartThunk;
