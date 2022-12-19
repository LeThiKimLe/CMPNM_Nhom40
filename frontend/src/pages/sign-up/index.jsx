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
import Typography from '@mui/material/Typography';
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
import { Stack } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import userThunk from '../../features/user/user.service';
import { userActions } from '../../features/user/user.slice';
import SideNavigation from '../../containers/side-navigation';
import { notification } from 'antd';

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
    firstName: Yup.string().required('Vui lòng nhập tên!'),
    lastName: Yup.string().required('Vui lòng nhập họ!'),
    email: Yup.string()
      .required('Vui lòng nhập địa chỉ email!')
      .email('Địa chỉ email không đúng!'),
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu!')
      .min(6, 'Mật khẩu phải ít nhất 6 ký tự!')
      .max(40, 'Mật khẩu không được nhiều hơn 40 ký tự!'),
    confirmPassword: Yup.string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([Yup.ref('password'), null], 'Xác nhập mật khẩu không trùng khớp'),
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
          message: 'Tạo tài khoản thành công!',
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
            <Card>
              <MDBox
                variant="gradient"
                borderRadius="lg"
                sx={{
                  backgroundColor: '#0F3460',
                  color: '#fff',
                }}
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h5"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Đăng ký
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
                      <MDInput
                        required
                        id="firstName"
                        name="firstName"
                        type="text"
                        {...register('firstName')}
                        error={errors.firstName ? true : false}
                        label="Tên"
                        sx={{ width: '230px' }}
                      />
                      <Typography
                        fontSize="14px"
                        variant="inherit"
                        color="primary"
                      >
                        {errors.firstName?.message}
                      </Typography>
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        required
                        id="lastName"
                        name="lastName"
                        {...register('lastName')}
                        error={errors.lastName ? true : false}
                        type="text"
                        label="Họ"
                        sx={{ width: '230px' }}
                      />
                      <Typography
                        variant="inherit"
                        fontSize="14px"
                        color="primary"
                      >
                        {errors.lastName?.message}
                      </Typography>
                    </MDBox>
                  </Stack>
                  <MDBox mb={2}>
                    <MDInput
                      required
                      id="email"
                      name="email"
                      {...register('email')}
                      error={errors.email ? true : false}
                      type="email"
                      label="Email"
                      fullWidth
                    />
                    <Typography
                      fontSize="14px"
                      variant="inherit"
                      color="primary"
                    >
                      {errors.email?.message}
                    </Typography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      required
                      id="password"
                      name="password"
                      {...register('password')}
                      error={errors.password ? true : false}
                      type="password"
                      label="Mật khẩu"
                      fullWidth
                    />
                    <Typography
                      fontSize="14px"
                      variant="inherit"
                      color="primary"
                    >
                      {errors.password?.message}
                    </Typography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      required
                      id="confirmPassword"
                      name="confirmPassword"
                      {...register('confirmPassword')}
                      error={errors.confirmPassword ? true : false}
                      type="password"
                      label="Nhập lại mật khẩu"
                      fullWidth
                    />
                    <Typography
                      fontSize="14px"
                      variant="inherit"
                      color="primary"
                    >
                      {errors.confirmPassword?.message}
                    </Typography>
                  </MDBox>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {user.loading ? (
                      <CircularProgress color={'success'} />
                    ) : null}
                  </Box>

                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="contained"
                      color="dark"
                      fullWidth
                      onClick={handleSubmit(onSubmit)}
                    >
                      Đăng ký
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Đã có tài khoản?
                      <MDTypography
                        component={Link}
                        to="/sign-in"
                        variant="button"
                        color="dark"
                        fontWeight="medium"
                        textGradient
                      >
                        Đăng nhập
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
