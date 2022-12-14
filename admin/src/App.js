/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'antd/dist/reset.css';
import './assets/styles/main.less';
import './assets/styles/responsive.less';
import Main from './containers/layout';
import Home from './pages/home';
import Orders from './pages/orders';
import Categories from './pages/categories';
import Profile from './pages/profile';
import SignIn from './pages/sigin_in';
import Users from './pages/users';
import { notification } from 'antd';
import { PrivateComponent } from './utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './features/auth/auth.slice';
import Products from './pages/products';
import VerifyAccount from './pages/verify_email';
import ReSendEmail from './pages/resend-email';
import authThunk from './features/auth/auth.service';
import orderThunk from './features/order/order.service';
import EditOrder from './pages/orders/edit-order';
import Banner from './pages/banner';
import { io } from 'socket.io-client';
import userThunk from './features/users/user.service';
const socket = io('http://localhost:3000/');

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // thêm input để khi auth.authenticate thay đổi thì useEffect() chạy
  useEffect(() => {
    if (!auth.isLoggedIn) {
      dispatch(authActions.isUserLoggedIn());
    }
  }, []);
  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(authThunk.getAllDataAPI());
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    socket.on('newOrder', (message) => {
      notification.success({
        message: `Đơn hàng có mã #${message.id} vừa được tạo!`,
        placement: 'top',
      });
      dispatch(orderThunk.getAllOrderAfter());
    });
    socket.on('cancelOrder', (message) => {
      notification.success({
        message: `Đơn hàng có mã #${message.id} vừa được hủy bởi khách hàng!`,
        placement: 'top',
      });
      dispatch(orderThunk.getAllOrderAfter());
    });
    socket.on('newUser', (message) => {
      notification.success({
        message: `Tài khoản có địa chỉ email #${message.email} vừa được tạo bởi khách hàng!`,
        placement: 'top',
      });
      dispatch(userThunk.getAllUserHandleAPI());
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Main>
          <Routes>
            <Route
              path="/profile"
              element={
                <PrivateComponent>
                  <Profile />
                </PrivateComponent>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateComponent>
                  <Categories />
                </PrivateComponent>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateComponent>
                  <Products />
                </PrivateComponent>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateComponent>
                  <Users />
                </PrivateComponent>
              }
            />

            <Route
              path="/orders/edit/:id"
              element={
                <PrivateComponent>
                  <EditOrder />
                </PrivateComponent>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateComponent>
                  <Orders />
                </PrivateComponent>
              }
            />
            <Route
              path="/banner"
              element={
                <PrivateComponent>
                  <Banner />
                </PrivateComponent>
              }
            />
            <Route
              path="/"
              element={
                <PrivateComponent>
                  <Home />
                </PrivateComponent>
              }
            />
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route path="/verify-email" element={<VerifyAccount />} />
            <Route path="/resend-verify-email" element={<ReSendEmail />} />
          </Routes>
        </Main>
      </div>
    </BrowserRouter>
  );
}
export const socketApp = socket;
export default App;
