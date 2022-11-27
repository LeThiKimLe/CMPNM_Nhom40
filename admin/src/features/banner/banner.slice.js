import { createSlice } from '@reduxjs/toolkit';
import bannerThunk from './banner.service';

const initialState = {
  banners: [],
  loading: false,
  getLoading: false,
  error: null,
  message: '',
};

const bannerSlice = createSlice({
  name: 'banner',
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
      .addCase(bannerThunk.createAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(bannerThunk.createAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(bannerThunk.createAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(bannerThunk.getAllAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(bannerThunk.getAllAPI.fulfilled, (state, action) => {
        state.getLoading = false;
        state.banners = action.payload.list;
      })
      .addCase(bannerThunk.getAllAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      });
  },
});

export const bannerActions = bannerSlice.actions;
const bannerReducer = bannerSlice.reducer;

export default bannerReducer;
