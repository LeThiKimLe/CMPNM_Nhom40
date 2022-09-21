import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import categoryReducer from '../features/category/category.slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
  devTools: true,
});
