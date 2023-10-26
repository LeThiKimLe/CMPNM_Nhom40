import { createSlice } from '@reduxjs/toolkit';

import attributeThunk from './attribute.service';

const initialState = {
  colors: [],
  loading: false,
  getLoading: false,
  error: null,
  message: '',
};

const attributeSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = '';
      state.error = null;
      state.loading = false;
      state.getLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(attributeThunk.createAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(attributeThunk.createAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(attributeThunk.createAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(attributeThunk.getAllAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(attributeThunk.getAllAPI.fulfilled, (state, action) => {
        state.getLoading = false;
        state.attributes = action.payload.list;
      })
      .addCase(attributeThunk.getAllAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      });
  },
});

export const attributeActions = attributeSlice.actions;
const attributeReducer = attributeSlice.reducer;

export default attributeReducer;
