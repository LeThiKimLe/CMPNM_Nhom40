/* eslint-disable array-callback-return */
import { Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import MainLayout from './containers/layout';
import Home from './pages/home';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material Dashboard 2 React themes
import theme from './assets/theme';
import SignIn from './pages/sign_in';
import SignUp from './pages/sign-up';
import FinishSignUp from './pages/finish-signup';
import { userActions } from './features/user/user.slice';
// import { PrivateComponent } from './utils/private-component';
import VerifyEmail from './pages/verify-email';
import dataThunk from './features/data/data.service';
import SingleProduct from './pages/single_product';
import { cartActions } from './features/cart/cart.slice';
import CartPage from './pages/cart';
import cartThunk from './features/cart/cart.service';
import ProfilePage from './pages/user/profile';
import './App.css';
import AddressPage from './pages/user/address';
import OrderPage from './pages/user/order';
import PasswordPage from './pages/user/password';
import CheckOutPage from './pages/checkout';
import OrderConfirmation from './pages/checkout/order-confirmation';
import OrderDetails from './pages/user/order-detail';
import addressThunk from './features/address/address.service';
import AllProductPage from './pages/all-products';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cartItemsLocal =
    localStorage.getItem('cartItems') == null
      ? null
      : JSON.parse(localStorage.getItem('cartItems'));

  // thêm input để khi auth.aut, henticate thay đổi thì useEffect() chạy
  useEffect(() => {
    dispatch(dataThunk.getAllAPI())
      .unwrap()
      .then((value) => {
        localStorage.setItem('categories', JSON.stringify(value.list[0]));
      });
  }, [dispatch]);
  useEffect(() => {
    if (!user.isLoggedIn) {
      dispatch(userActions.isUserLoggedIn());
    }
  }, [dispatch, user.isLoggedIn]);
  useEffect(() => {
    if (user.isLoggedIn) {
      const { userId } = user.user;
      dispatch(cartThunk.getAllItemsAPI());

      // get cart in mongoose
      // * cartItems in state change
      if (cartItemsLocal !== null) {
        // TODO add to mongose
        let newCartItems = [];
        cartItemsLocal.map((item) => {
          const newItem = {
            product: item._id,
            quantity: item.quantity,
          };
          newCartItems.push(newItem);
        });
        dispatch(
          cartThunk.addLocalToCartAPI({
            user: userId,
            cartItems: newCartItems,
          })
        )
          .unwrap()
          .then(() => {
            dispatch(cartThunk.getAllItemsAPI());
          });
        localStorage.removeItem('cartItems');
      }
    } else {
      if (cartItemsLocal !== null) {
        dispatch(cartActions.getAllItemsLocal(cartItemsLocal));
      }
    }
  }, [user.isLoggedIn, cartItemsLocal, dispatch, user.user]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route path="/user/address" element={<AddressPage />} />
            <Route path="/user/password" element={<PasswordPage />} />
            <Route path="/user/order/:id" element={<OrderDetails />} />
            <Route path="/user/order" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/products" exact element={<AllProductPage />} />
            <Route path="/products/*" element={<SingleProduct />} />
            <Route path="/finish-signup" element={<FinishSignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
