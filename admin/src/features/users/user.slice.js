import { createSlice } from '@reduxjs/toolkit';

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
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
