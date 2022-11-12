import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios';

const addAddressAPI = createAsyncThunk(
  'address/add',
  async (address, thunkAPI) => {
    try {
      //
      const response = await axiosClient.post(
        '/address/add',
        JSON.stringify({ data: address })
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
const updateAddressAPI = createAsyncThunk(
  'address/update',
  async (address, thunkAPI) => {
    try {
      //
      const response = await axiosClient.post(
        '/address/update',
        JSON.stringify({ data: address })
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
const getAllAPI = createAsyncThunk('address/get-all', async (thunkAPI) => {
  try {
    //
    const response = await axiosClient.get('/address/get-all');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const deleteAddressAPI = createAsyncThunk(
  'address/delete-item-address',
  async (addressId, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/address/delete',
        JSON.stringify({ data: addressId })
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
const setDefaultAddressAPI = createAsyncThunk(
  'address/set-default',
  async (addressId, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/address/set-default',
        JSON.stringify({ data: addressId })
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
const addressThunk = {
  addAddressAPI,
  getAllAPI,
  updateAddressAPI,
  deleteAddressAPI,
  setDefaultAddressAPI,
};

export default addressThunk;
