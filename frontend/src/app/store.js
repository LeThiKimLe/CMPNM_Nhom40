import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/data/data.slice';
import userReducer from '../features/user/user.slice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
  devTools: true,
});
