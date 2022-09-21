import { createSlice } from '@reduxjs/toolkit';
import authThunk from './auth.service';
import TokenService from '../token/token.service';
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
    isUserLoggedIn: {
      reducer: (state, action) => {
        const { adminData, accessToken } = action.payload;
        state.logging = false;
        state.user = action.payload.adminData;
        state.token = action.payload.accessToken;

        state.logging = false;
        if (!accessToken || !adminData) {
          state.isLoggedIn = false;
        } else {
          state.isLoggedIn = true;
        }
      },
      prepare: () => {
        const token = TokenService.getLocalAccessToken();
        const user = JSON.parse(localStorage.getItem('user'));
        return { payload: { adminData: user, accessToken: token } };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunk.signinAPI.pending, (state) => {
        state.logging = true;
      })
      .addCase(authThunk.signinAPI.fulfilled, (state, action) => {
        state.logging = false;
        state.user = action.payload.adminData;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.logging = false;
      })
      .addCase(authThunk.signinAPI.rejected, (state, action) => {
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
export const selectToken = (state) => state.auth.token;
const authReducer = authSlice.reducer;

export default authReducer;
