import { createSlice } from '@reduxjs/toolkit';
import dataThunk from './data.service';
//

const initialState = {
  categories: [],
  products: [],
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
        state.loading = false;
        state.categories = action.payload.list[0];
        state.products = action.payload.list[1];
      })
      .addCase(dataThunk.getAllAPI.rejected, (state, action) => {
        console.log(action.payload);
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const dataActions = dataSlice.actions;

const dataReducer = dataSlice.reducer;

export default dataReducer;
