import { createSlice } from '@reduxjs/toolkit';
import dataThunk from './data.service';
//

const initialState = {
  categories: [],
  products: [],

  banners: [],
  message: '',
  error: false,
  loading: false,
};
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dataThunk.getAllAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(dataThunk.getAllAPI.fulfilled, (state, action) => {
        const value = action.payload;
        state.categories = value.list[0];
        localStorage.setItem('categories', JSON.stringify(value.list[0]));
        state.products = action.payload.list[1];
        console.log("products", action.payload.list[1]);
        state.banners = action.payload.list[2];
        state.loading = false;
      })
      .addCase(dataThunk.getAllAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const dataActions = dataSlice.actions;

const dataReducer = dataSlice.reducer;

export default dataReducer;
