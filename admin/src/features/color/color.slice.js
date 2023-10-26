import { createSlice } from '@reduxjs/toolkit';
import colorThunk from './color.service';

const initialState = {
  colors: [],
  loading: false,
  getLoading: false,
  error: null,
  message: '',
};

const colorSlice = createSlice({
  name: 'color',
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
      .addCase(colorThunk.createAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(colorThunk.createAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(colorThunk.createAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(colorThunk.getAllAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(colorThunk.getAllAPI.fulfilled, (state, action) => {
        state.getLoading = false;
        state.colors = action.payload.list;
      })
      .addCase(colorThunk.getAllAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      });
  },
});

export const colorActions = colorSlice.actions;
const colorReducer = colorSlice.reducer;

export default colorReducer;
