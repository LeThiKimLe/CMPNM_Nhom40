import { createSlice } from '@reduxjs/toolkit';
import dataThunk from './data.service';
import {
  getListCategory,
  getAllGroupProducts,
} from '../../utils/custom-products';
//

const initialState = {
  categories: [],
  products: [],
  colors: [],
  productGroups: [],
  categoryGroups: [],
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
        const listCategory = getListCategory(action.payload.list[1]);
        const allGroupProducts = getAllGroupProducts(
          listCategory,
          action.payload.list[1],
          action.payload.list[0]
        );
        state.loading = false;
        state.categoryGroups = listCategory;
        state.productGroups = allGroupProducts;
        state.categories = action.payload.list[0];
        state.products = action.payload.list[1];
        state.colors = action.payload.list[2];
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
