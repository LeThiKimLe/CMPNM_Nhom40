/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { createSlice } from '@reduxjs/toolkit';
import { customListOrder } from '../../utils/custom-order';
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
      .addCase(orderThunk.getAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunk.getAllOrder.fulfilled, (state, action) => {
        const newListOrder = customListOrder(
          action.payload.list[1],
          action.payload.list[0]
        );
        console.log('newListOrder-or', typeof newListOrder);
        state.orderList = newListOrder;
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
