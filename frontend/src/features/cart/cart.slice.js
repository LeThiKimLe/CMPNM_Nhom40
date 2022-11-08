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
    getAllItemsLocal: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCartItemLocal: (state, action) => {
      // amount product
      let items = [];
      const amount = action.payload.amount;
      const product = action.payload.product;
      const cartItems =
        localStorage.getItem('cartItems') == null
          ? null
          : JSON.parse(localStorage.getItem('cartItems'));

      let cartItem = {};

      if (cartItems === null) {
        cartItem = {
          product,
          quantity: amount,
        };
        items.push(cartItem);
      } else {
        items = cartItems;
        const index = items.findIndex((item) => {
          return item.product._id === product._id;
        });

        if (index !== -1) {
          items[index].quantity = Number(items[index].quantity) + amount;
        } else {
          items.push({
            product,
            quantity: amount,
          });
        }
      }

      localStorage.setItem('cartItems', JSON.stringify(items));
      state.cartItems = items;
    },
    deleteCartItemLocal: (state, action) => {
      const productId = action.payload.productId;
      console.log(productId);
      const cartItems =
        localStorage.getItem('cartItems') == null
          ? null
          : JSON.parse(localStorage.getItem('cartItems'));
      const newCartItems = cartItems.filter(
        (item) => item.product._id != productId
      );
      if (newCartItems.length === 0) {
        localStorage.setItem('cartItems', null);
      } else {
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      }
      console.log('newCartItems', newCartItems);
      state.cartItems = newCartItems;
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
