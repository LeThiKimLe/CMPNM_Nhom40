import { createSlice } from '@reduxjs/toolkit';
import categoryThunk from './category.service';
const initialState = {
  categories: [],
  loading: false,
  getLoading: false,
  error: null,
  message: '',
  success: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = '';
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryThunk.createAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryThunk.createAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(categoryThunk.createAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(categoryThunk.getAllAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(categoryThunk.getAllAPI.fulfilled, (state, action) => {
        state.getLoading = false;
        state.categories = action.payload.list;
      })
      .addCase(categoryThunk.getAllAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      })
      .addCase(categoryThunk.deleteCategoryAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryThunk.deleteCategoryAPI.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(categoryThunk.deleteCategoryAPI.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const categoryActions = categorySlice.actions;
export const getAllCategories = (state) => state.category.categories;
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
