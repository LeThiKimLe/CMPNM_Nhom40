import { createSlice } from '@reduxjs/toolkit';
import dataThunk from './data.service';
import { customListOrder } from '../../utils/custom-order';
const initialState = {
  categories: [],
  userAddresses: [],
  orders: [],
  colors: [],
  loading: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(dataThunk.getAllDataAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(dataThunk.getAllDataAPI.fulfilled, (state, action) => {
        const newListOrder = customListOrder(
          action.payload.list[2],
          action.payload.list[0]
        );
        state.addressUsers = action.payload.list[0];
        state.categories = action.payload.list[1];
        state.orders = newListOrder;
        state.colors = action.payload.list[3];
        state.loading = false;
      })
      .addCase(dataThunk.getAllDataAPI.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

const dataReducer = dataSlice.reducer;
export const dataActions = dataSlice.actions;
export default dataReducer;
