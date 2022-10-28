import { Routes, Route } from 'react-router-dom';
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
import { PrivateComponent } from './utils/private-component';
import VerifyEmail from './pages/verify-email';
import dataThunk from './features/data/data.service';
import SingleProduct from './pages/single_product';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const { categories, products, colors } = data;
  // thêm input để khi auth.aut, henticate thay đổi thì useEffect() chạy
  useEffect(() => {
    if (!user.isLoggedIn) {
      dispatch(userActions.isUserLoggedIn());
    }
    if (
      categories.length === 0 ||
      products.length === 0 ||
      colors.length === 0
    ) {
      dispatch(dataThunk.getAllAPI());
    }
  }, [user.isLoggedIn, dispatch, categories, products, colors]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateComponent>
                  <Home />
                </PrivateComponent>
              }
            />
            <Route path="/products/*" element={<SingleProduct />} />
            <Route path="/finish-signup/:slug" element={<FinishSignUp />} />
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
