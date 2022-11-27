import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// react-router-dom components
import { Grid, Box, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import MDInput from '../../components/MDInput';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import Footer from '../../containers/footer';
// Authentication layout components
// Images
import verifyEmailSuccess from '../../assets/images/verify-email-success.png';
import verifyEmailError from '../../assets/images/verify-email-error.png';

import Header from '../../containers/header';
import Navbar from '../../containers/navbar';
import userThunk from '../../features/user/user.service';
import { userActions } from '../../features/user/user.slice';
import SideNavigation from '../../containers/side-navigation';
const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailValue, setEmailValue] = useState('');
  const [loading, setLoading] = useState(false);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const onClickHandler = () => {
    console.log(emailValue);
    setLoading(true);
    dispatch(userThunk.reSendVerifyEmailAPI(emailValue))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate('/finish-signup');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useMemo(() => {
    const verifyData = { token, email };
    dispatch(userThunk.verifyEmailAPI(verifyData));
  }, [dispatch, token, email]);
  if (user.loading) {
    return (
      <MDBox
        width="100vw"
        height="100%"
        minHeight="100vh"
        sx={{ overflowX: 'hidden' }}
      >
        <MDBox position="absolute" width="100%" minHeight="100vh" />
        <MDBox width="100%" height="100vh" mx="auto">
          <Header />
          <Navbar />
          <SideNavigation />
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            height="60%"
          >
            <Grid item xs={12} sm={9} md={7} lg={6} xl={5}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress color="success" />
              </Box>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    );
  }
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: 'hidden' }}
    >
      <MDBox position="absolute" width="100%" minHeight="100vh" />
      <MDBox width="100%" height="100vh" mx="auto">
        <Header />
        <Navbar />
        <SideNavigation />
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="60%"
        >
          <Grid item xs={12} sm={9} md={7} lg={6} xl={5}>
            {user.error ? (
              <>
                <div
                  style={{
                    marginBottom: '40px',
                    marginTop: '30px',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={verifyEmailError}
                    alt="tiep"
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginBottom: '40px',
                      width: '30%',
                    }}
                  />
                  <MDTypography
                    variant="h5"
                    color="dark"
                    verticalAlign="middle"
                    sx={{ marginBottom: '30px' }}
                  >
                    {user.message}
                  </MDTypography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {loading ? <CircularProgress color={'success'} /> : null}
                  </Box>
                </div>
                <Grid item xs={12}>
                  <MDBox
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ width: 400 }}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <MDInput
                        size="large"
                        sx={{ width: 300 }}
                        required
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        onChange={(e) => setEmailValue(e.target.value)}
                      />

                      <MDButton
                        variant="gradient"
                        color="info"
                        onClick={onClickHandler}
                      >
                        Gửi lại
                      </MDButton>
                    </Stack>
                  </MDBox>
                </Grid>
              </>
            ) : (
              <div
                style={{
                  marginBottom: '40px',
                  marginTop: '30px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={verifyEmailSuccess}
                  alt="tiep"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '40px',
                    width: '30%',
                  }}
                />
                <MDTypography
                  variant="h5"
                  color="dark"
                  verticalAlign="middle"
                  sx={{ marginBottom: '30px' }}
                >
                  Bạn đã kích hoạt tài khoản thành công!
                </MDTypography>
                <MDButton
                  variant="contained"
                  component={Link}
                  to="/sign-in"
                  color="info"
                >
                  Đăng nhập
                </MDButton>
              </div>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Footer dark />
    </MDBox>
  );
};

export default VerifyEmail;
