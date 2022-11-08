import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/data/data.slice';
import userReducer from '../features/user/user.slice';
import cartReducer from '../features/cart/cart.slice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
    cart: cartReducer,
  },
  devTools: true,
});
