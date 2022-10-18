import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.less';
import './assets/styles/main.less';
import './assets/styles/responsive.less';
import Main from './containers/layout';
import Home from './pages/home';
import Orders from './pages/orders';
import Categories from './pages/categories';
import Profile from './pages/profile';
import SignIn from './pages/sigin_in';
import Users from './pages/users';
import { PrivateComponent } from './utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './features/auth/auth.slice';
import Products from './pages/products';
import VerifyAccount from './pages/verify_email';
import ReSendEmail from './pages/resend-email';
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // thêm input để khi auth.authenticate thay đổi thì useEffect() chạy
  useEffect(() => {
    if (!auth.isLoggedIn) {
      dispatch(authActions.isUserLoggedIn());
    }
  }, [auth.isLoggedIn, dispatch]);
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
              path="/orders"
              element={
                <PrivateComponent>
                  <Orders />
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

export default App;
