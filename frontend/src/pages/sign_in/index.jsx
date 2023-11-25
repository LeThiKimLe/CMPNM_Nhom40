import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// react-router-dom components
import { Link, useNavigate } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { InputBase } from '@mui/material';
// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDInput from '../../components/MDInput';
import MDButton from '../../components/MDButton';
import Footer from '../../containers/footer';
// Authentication layout components
// Images

import Header from '../../containers/header';
import Navbar from '../../containers/navbar';
//
import { notification } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import userThunk from '../../features/user/user.service';
import { userActions } from '../../features/user/user.slice';
import SideNavigation from '../../containers/side-navigation';
function SignIn() {
  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please enter email address!')
      .email('Incorrect email address!'),
    password: Yup.string()
      .required('Please enter password!')
      .min(6, 'Password must be at least 6 characters!')
      .max(40, 'Password cannot be more than 40 characters!'),
  });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { isLoggedIn, user, error, message } = userState;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinValidationSchema) });
  const onSubmit = (data) => {
    dispatch(userThunk.signinAPI(data))
      .unwrap()
      .then((value) => {
        notification.success({
          message: 'Login successfully!',
          placement: 'top',
        });
        navigate(-1);
      })
      .catch((error) => {
        setOpen(true);
      });
    dispatch(userActions.reset());
  };

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: 'hidden', backgroundColor: '#fff' }}
    >
      <MDBox position="absolute" width="100%" minHeight="100vh" />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <MDBox width="100%" height="100vh" mx="auto">
        <Header />
        <Navbar />
        <SideNavigation />
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="80%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card
              sx={{
                borderRadius: '8px',
                boxShadow: '#dbd9d9 5px 5px 10px 10px',
              }}
            >
              <MDBox
                variant="contained"
                sx={{
                  backgroundColor: '#edf8f7',
                  borderRadius: '8px',
                  boxShadow: '#dbd9d9 5px 5px 10px 10px',
                }}
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  sx={{
                    color: '#46bcaa',
                    fontSize: '32px',
                    fontWeight: '700',
                  }}
                >
                  Welcome,
                </MDTypography>
                <MDTypography
                  sx={{
                    color: '#46bcaa',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Sign in to continue!
                </MDTypography>
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  sx={{ mt: 1, mb: 2 }}
                >
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      sx={{
                        color: '#46bcaa',
                      }}
                    >
                      <FacebookIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      sx={{
                        color: '#46bcaa',
                      }}
                    >
                      <GitHubIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      sx={{
                        color: '#46bcaa',
                      }}
                    >
                      <GoogleIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <InputBase
                      sx={{
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '#dbd9d9 5px 5px 5px 5px',
                        color: '#808191',
                        display: 'flex',
                        fontFamily: 'Poppins',
                        fontSize: '13px',
                        fontWeight: 'medium',
                        gridArea: 'auto',
                        lineHeight: '19.5px',
                        padding: '0px 9.75px',
                        height: '45px',
                      }}
                      placeholder="Email"
                      required
                      id="email"
                      name="email"
                      {...register('email')}
                      error={errors.email ? true : false}
                      type="email"
                      label="Email"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <InputBase
                      sx={{
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '#dbd9d9 5px 5px 5px 5px',
                        color: '#808191',
                        display: 'flex',
                        fontFamily: 'Poppins',
                        fontSize: '13px',
                        fontWeight: 'medium',
                        gridArea: 'auto',
                        lineHeight: '19.5px',
                        padding: '0px 9.75px',
                        height: '45px',
                      }}
                      placeholder="Password"
                      required
                      id="password"
                      name="password"
                      {...register('password')}
                      error={errors.password ? true : false}
                      type="password"
                      label="Password"
                      fullWidth
                    />
                  </MDBox>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {userState.logging ? (
                      <CircularProgress color={'success'} />
                    ) : null}
                  </Box>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="contained"
                      fullWidth
                      color="warning"
                      sx={{
                        color: '#1f2128',
                        backgroundColor: '#ffcf52',
                      }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Login
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" sx={{ color: '#1f2128' }}>
                      No account?
                      <MDTypography
                        component={Link}
                        to="/sign-up"
                        variant="button"
                        fontWeight="medium"
                        sx={{ color: '#1f2128' }}
                      >
                        register
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer dark />
    </MDBox>
  );
}

export default SignIn;
