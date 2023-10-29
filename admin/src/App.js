/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './assets/styles/main.less';
import './assets/styles/responsive.less';
import Main from './containers/layout';
import Home from './pages/home';
import Orders from './pages/orders';
import Categories from './pages/categories';
import Profile from './pages/profile';
import SignIn from './pages/sigin_in';
import Users from './pages/users';
import Colors from './pages/color';
import Attributes from './pages/attribute';

import { PrivateComponent } from './utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './features/auth/auth.slice';
import Products from './pages/products';
import VerifyAccount from './pages/verify_email';
import ReSendEmail from './pages/resend-email';
import EditOrder from './pages/orders/edit-order';
import Banner from './pages/banner';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.isLoggedIn) {
      dispatch(authActions.isUserLoggedIn());
    }
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
              path="/attributes"
              element={
                <PrivateComponent>
                  <Attributes />
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
              path="/colors"
              element={
                <PrivateComponent>
                  <Colors />
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
              exact
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
export default App;
