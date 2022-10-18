import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import categoryReducer from '../features/category/category.slice';
import userReducer from '../features/users/user.slice';
import productReducer from '../features/product/product.slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    product: productReducer,
  },
  devTools: true,
});
