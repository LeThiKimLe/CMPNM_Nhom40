import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axios-client';

const createUserAPI = createAsyncThunk(
  'admin/create-user',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/admin/create-user',
        JSON.stringify({ data: userData })
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

const getAllUserAPI = createAsyncThunk('admin/get-users', async (thunkAPI) => {
  try {
    const response = await axiosClient.get('/admin/get-users');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const getAllUserHandleAPI = createAsyncThunk(
  'admin/get-users-handle',
  async (thunkAPI) => {
    try {
      const response = await axiosClient.get('/admin/get-all-user-handle');
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
const deleteUsersAPI = createAsyncThunk(
  '/delete-users',
  async (listID, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        '/admin/delete-users',
        JSON.stringify({ data: listID })
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
const userThunk = {
  createUserAPI,
  getAllUserAPI,
  deleteUsersAPI,
  getAllUserHandleAPI,
};

export default userThunk;
