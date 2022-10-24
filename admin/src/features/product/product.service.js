import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';
const createAPI = createAsyncThunk(
  '/product/create',
  async (productData, thunkAPI) => {
    try {
      console.log(productData);
      const response = await axiosClient.post(
        '/product/create',

        JSON.stringify({ data: productData })
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
const getAllAPI = createAsyncThunk('/products/get-all', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/product');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const deleteProductAPI = createAsyncThunk(
  '/product/delete',
  async (listID, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        `/product/delete`,
        JSON.stringify({ data: listID })
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
const productThunk = {
  createAPI,
  getAllAPI,
  deleteProductAPI,
};
export default productThunk;
