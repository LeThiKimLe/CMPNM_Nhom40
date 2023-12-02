/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { createSlice } from '@reduxjs/toolkit';
import orderThunk from './order.service';
const initialState = {
  orderList: [],
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.orderList = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderThunk.addOrderAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunk.addOrderAPI.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(orderThunk.addOrderAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(orderThunk.getAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunk.getAllOrder.fulfilled, (state, action) => {
        state.orderList = action.payload.orders;
        state.loading = false;
      })
      .addCase(orderThunk.getAllOrder.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(orderThunk.getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunk.getOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(orderThunk.getOrder.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export default orderReducer;
