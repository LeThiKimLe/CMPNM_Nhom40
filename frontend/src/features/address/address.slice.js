import { createSlice } from '@reduxjs/toolkit';
import addressThunk from './address.service';

const initialState = {
  addresses: [],
  updatingAddress: false,
  error: null,
  getLoading: false,
};

const addressSlice = createSlice({
  name: 'addressUser',
  initialState,
  reducers: {
    reset: (state) => {
      state.addresses = [];
      state.updatingAddress = false;
      state.error = null;
      state.getLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addressThunk.getAllAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(addressThunk.getAllAPI.fulfilled, (state, action) => {
        state.addresses = action.payload.addresses;
        state.getLoading = false;
      })
      .addCase(addressThunk.getAllAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      })
      .addCase(addressThunk.addAddressAPI.pending, (state) => {
        state.updatingAddress = true;
      })
      .addCase(addressThunk.addAddressAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        state.updatingAddress = false;
      })
      .addCase(addressThunk.addAddressAPI.rejected, (state, action) => {
        state.error = true;
        state.updatingAddress = false;
      })
      .addCase(addressThunk.updateAddressAPI.pending, (state) => {
        state.updatingAddress = true;
      })
      .addCase(addressThunk.updateAddressAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        state.updatingAddress = false;
      })
      .addCase(addressThunk.updateAddressAPI.rejected, (state, action) => {
        state.error = true;
        state.updatingAddress = false;
      })
      .addCase(addressThunk.deleteAddressAPI.pending, (state) => {
        state.updatingAddress = true;
      })
      .addCase(addressThunk.deleteAddressAPI.fulfilled, (state, action) => {
        state.updatingAddress = false;
      })
      .addCase(addressThunk.deleteAddressAPI.rejected, (state, action) => {
        state.error = true;
        state.updatingAddress = false;
      })
      .addCase(addressThunk.setDefaultAddressAPI.pending, (state) => {
        state.updatingAddress = true;
      })
      .addCase(addressThunk.setDefaultAddressAPI.fulfilled, (state, action) => {
        state.updatingAddress = false;
      })
      .addCase(addressThunk.setDefaultAddressAPI.rejected, (state, action) => {
        state.error = true;
        state.updatingAddress = false;
      });
  },
});
const addressReducer = addressSlice.reducer;
export const addressActions = addressSlice.actions;
export default addressReducer;
