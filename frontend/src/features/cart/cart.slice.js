/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { createSlice } from '@reduxjs/toolkit';
import cartThunk from './cart.service';
const initialState = {
  cartItems: [],
  updatingCart: false,
  error: null,
  getLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.cartItems = [];
      state.updatingCart = false;
      state.error = null;
      state.getLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartThunk.getAllItemsAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(cartThunk.getAllItemsAPI.fulfilled, (state, action) => {
        // const { products, cartItems } = action.payload;
        // const listItems = getAllCartItemsDetail(products, cartItems);
        state.cartItems = action.payload.cartItems;
        state.getLoading = false;
      })
      .addCase(cartThunk.getAllItemsAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      })
      .addCase(cartThunk.addToCartAPI.pending, (state) => {
        state.updatingCart = true;
      })
      .addCase(cartThunk.addToCartAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        state.updatingCart = false;
      })
      .addCase(cartThunk.addToCartAPI.rejected, (state, action) => {
        state.error = true;
        state.updatingCart = false;
      })
      .addCase(cartThunk.updateCartItemAPI.pending, (state) => {
        state.updatingCart = true;
      })
      .addCase(cartThunk.updateCartItemAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        state.updatingCart = false;
      })
      .addCase(cartThunk.updateCartItemAPI.rejected, (state, action) => {
        state.error = true;
        state.updatingCart = false;
      })
      .addCase(cartThunk.deleteCartItemAPI.pending, (state) => {
        state.updatingCart = true;
      })
      .addCase(cartThunk.deleteCartItemAPI.fulfilled, (state, action) => {
        state.updatingCart = false;
      })
      .addCase(cartThunk.deleteCartItemAPI.rejected, (state, action) => {
        state.error = true;
        state.updatingCart = false;
      });
  },
});

const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export default cartReducer;
