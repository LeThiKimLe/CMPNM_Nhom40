import { createSlice } from '@reduxjs/toolkit';
import { signinAPIThunk } from './auth.service';
//

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  logging: false,
  error: null,
  message: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinAPIThunk.pending, (state) => {
        state.logging = true;
      })
      .addCase(signinAPIThunk.fulfilled, (state, action) => {
        state.logging = false;
        state.user = action.payload.adminData;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.logging = false;
      })
      .addCase(signinAPIThunk.rejected, (state, action) => {
        console.log(action.payload);
        state.error = true;
        state.logging = false;
        state.message = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
const authReducer = authSlice.reducer;

export default authReducer;
