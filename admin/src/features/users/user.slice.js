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
      })
      .addCase(userThunk.getAllUserAPI.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(userThunk.getAllUserAPI.fulfilled, (state, action) => {
        state.getLoading = false;
        state.users = action.payload.list;
      })
      .addCase(userThunk.getAllUserAPI.rejected, (state, action) => {
        state.error = true;
        state.getLoading = false;
      })
      .addCase(userThunk.deleteUsersAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunk.deleteUsersAPI.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userThunk.deleteUsersAPI.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
