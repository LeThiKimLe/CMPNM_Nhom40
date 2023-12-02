import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// react-router-dom components
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import Footer from '../../containers/footer';
// Authentication layout components
// Images
import Header from '../../containers/header';
import Navbar from '../../containers/navbar';
import { Input, Stack } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import userThunk from '../../features/user/user.service';
import { userActions } from '../../features/user/user.slice';
import SideNavigation from '../../containers/side-navigation';
import { notification } from 'antd';
import './style.css';

function SignUp() {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // * validation shema
  const signupValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter name!'),
    lastName: Yup.string().required('Please enter last name!'),
    email: Yup.string()
      .required('Please enter email address!')
      .email('Incorrect email address!'),
    password: Yup.string()
      .required('Please enter password!')
      .min(6, 'Password must be at least 6 characters!')
      .max(40, 'Password cannot be more than 40 characters!'),
    confirmPassword: Yup.string()
      .required('Please re-enter your password')
      .oneOf([Yup.ref('password'), null], 'Password input does not match'),
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // todo useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupValidationSchema) });
  const onSubmit = (data) => {
    delete data.confirmPassword;
    dispatch(userThunk.signupAPI(data))
      .unwrap()
      .then((value) => {
        const { firstName, email } = value;

        navigate('/finish-signup', { state: { firstName, email } });
        dispatch(userActions.reset());
        notification.success({
          message: 'Create account succesfully!',
          placement: 'top',
        });
      })
      .catch((error) => {
        setOpen(true);
      });
  };
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: 'hidden', backgroundColor: '#fff' }}
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
          height="80%"
        >
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              {user.message}
            </Alert>
          </Snackbar>
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card
              sx={{
                borderRadius: '8px',
                boxShadow: '#dbd9d9 5px 5px 10px 10px',
              }}
            >
              <MDBox
                variant="gradient"
                borderRadius="lg"
                sx={{
                  backgroundColor: '#1f2128',
                  color: '#fff',
                  borderRadius: '8px',
                  boxShadow: '#dbd9d9 5px 5px 10px 10px',
                }}
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                {' '}
                <MDTypography
                  sx={{
                    color: '#fff',
                    fontSize: '32px',
                    fontWeight: '700',
                  }}
                >
                  Create Account,
                </MDTypography>
                <MDTypography
                  sx={{
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Sign up to get started!
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
                      variant="body1"
                      color="white"
                    >
                      <FacebookIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GitHubIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GoogleIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox
                  component="form"
                  role="form"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                  >
                    <MDBox mb={2}>
                      <Input
                        className="input-element"
                        placeholder="First name"
                        required
                        id="firstName"
                        name="firstName"
                        type="text"
                        {...register('firstName')}
                        label="First name"
                      />
                      {errors.firstName && (
                        <MDTypography variant="caption" color="error">
                          {errors.firstName.message}
                        </MDTypography>
                      )}
                    </MDBox>
                    <MDBox mb={2}>
                      <Input
                        className="input-element"
                        required
                        id="lastName"
                        name="lastName"
                        {...register('lastName')}
                        type="text"
                        label="Họ"
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <MDTypography variant="caption" color="error">
                          {errors.lastName.message}
                        </MDTypography>
                      )}
                    </MDBox>
                  </Stack>
                  <MDBox mb={2}>
                    <Input
                      className="input-element"
                      required
                      id="email"
                      name="email"
                      {...register('email')}
                      type="email"
                      label="Email"
                      fullWidth
                      placeholder="Email"
                    />
                    {errors.email && (
                      <MDTypography variant="caption" color="error">
                        {errors.email.message}
                      </MDTypography>
                    )}
                  </MDBox>
                  <MDBox mb={2}>
                    <Input
                      className="input-element"
                      required
                      id="password"
                      name="password"
                      {...register('password')}
                      error={errors.password ? true : false}
                      type="password"
                      label="Password"
                      placeholder="Password"
                      fullWidth
                    />
                    {errors.password && (
                      <MDTypography variant="caption" color="error">
                        {errors.password.message}
                      </MDTypography>
                    )}
                  </MDBox>
                  <MDBox mb={2}>
                    <Input
                      className="input-element"
                      required
                      id="confirmPassword"
                      name="confirmPassword"
                      {...register('confirmPassword')}
                      error={errors.confirmPassword ? true : false}
                      type="password"
                      label="Confirm password"
                      placeholder="Confirm password"
                      fullWidth
                    />
                    {errors.confirmPassword && (
                      <MDTypography variant="caption" color="error">
                        {errors.confirmPassword.message}
                      </MDTypography>
                    )}
                  </MDBox>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {user.loading ? <CircularProgress color={'dark'} /> : null}
                  </Box>

                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="contained"
                      fullWidth
                      color="info"
                      sx={{
                        color: '#fff',
                        backgroundColor: '#4d69fa',
                      }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Sign up
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" sx={{ color: '#1f2128' }}>
                      Already have an account?
                      <MDTypography
                        component={Link}
                        to="/sign-in"
                        variant="button"
                        color="dark"
                        fontWeight="medium"
                        sx={{ color: '#1f2128' }}
                      >
                        Login
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

export default SignUp;
