import { createSlice } from '@reduxjs/toolkit';
import userThunk from './user.service';

//

const initialState = {
  users: [],
  error: null,
  message: '',
  loading: false,
  getLoading: false,
  success: false,
};
const userSlice = createSlice({
  name: 'user',
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
      .addCase(userThunk.createUserAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunk.createUserAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(userThunk.createUserAPI.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
