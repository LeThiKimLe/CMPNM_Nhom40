import { createSlice } from '@reduxjs/toolkit';
import userThunk from './user.service';
import TokenService from '../token/token.service';
//

const initialState = {
  user: null,
  isLoggedIn: false,
  logging: false,
  message: '',
  error: false,
  loading: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = '';
      state.error = null;
    },
    signout: (state) => {
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('compare');
      localStorage.removeItem('compareLocal');
      localStorage.removeItem('orderCodMomo');
      localStorage.removeItem('selectedAddress');
      state.isLoggedIn = false;
      state.user = null;
    },
    isUserLoggedIn: {
      reducer: (state, action) => {
        const { accessToken } = action.payload;

        state.logging = false;
        if (!accessToken) {
          state.isLoggedIn = false;
        } else {
          state.isLoggedIn = true;
        }
      },
      prepare: () => {
        const token = localStorage.getItem('accessToken');
        return { payload: { accessToken: token } };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.signinAPI.pending, (state) => {
        state.logging = true;
      })
      .addCase(userThunk.signinAPI.fulfilled, (state, action) => {
        state.logging = false;
        state.user = action.payload.userId;
        state.isLoggedIn = true;
        state.logging = false;
        localStorage.setItem('userId', action.payload.userId);
      })
      .addCase(userThunk.signinAPI.rejected, (state, action) => {
        state.error = true;
        state.logging = false;
        state.message = action.payload;
      })
      .addCase(userThunk.signupAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunk.signupAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userThunk.signupAPI.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(userThunk.verifyEmailAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunk.verifyEmailAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userThunk.verifyEmailAPI.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = true;
      })
      .addCase(userThunk.showProfileAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunk.showProfileAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log(action.payload);
      })
      .addCase(userThunk.showProfileAPI.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })

      .addCase(userThunk.cancelOrderAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunk.cancelOrderAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userThunk.cancelOrderAPI.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const userActions = userSlice.actions;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLogging = (state) => state.user.logging;
export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;
const userReducer = userSlice.reducer;

export default userReducer;
