import { createSlice } from '@reduxjs/toolkit';
import productThunk from './product.service';
const initialState = {
  products: [],
  loading: false,
  getLoading: false,
  error: null,
  message: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = '';
      state.error = null;
      state.success = false;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productThunk.createAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunk.createAPI.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(productThunk.createAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(productThunk.getAllAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(productThunk.getAllAPI.fulfilled, (state, action) => {
        state.getLoading = false;
        state.products = action.payload.list;
      })
      .addCase(productThunk.getAllAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      })
      .addCase(productThunk.deleteProductAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunk.deleteProductAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(productThunk.deleteProductAPI.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const productActions = productSlice.actions;
export const getAllProducts = (state) => state.product.products;
const productReducer = productSlice.reducer;

export default productReducer;
