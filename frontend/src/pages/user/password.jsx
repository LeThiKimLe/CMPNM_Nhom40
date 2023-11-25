import React, { useState } from 'react';
import UserPage from './user-page';
import {
  Divider,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import userThunk from '../../features/user/user.service';
import MDTypography from '../../components/MDTypography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MDButton from '../../components/MDButton';
import MDBox from '../../components/MDBox';
import MDInput from '../../components/MDInput';
const PasswordPage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // * validation shema
  const signupValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Please enter password!')
      .min(6, 'Password must be at least 6 characters!')
      .max(40, 'Password cannot be more than 40 characters!'),
    newPassword: Yup.string()
      .required('Please enter password!')
      .min(6, 'Password must be at least 6 characters!')
      .max(40, 'Password cannot be more than 40 characters!'),
    newConfirmPassword: Yup.string()
      .required('Please re-enter your password')
      .oneOf([Yup.ref('newPassword'), null], 'Password input does not match'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(signupValidationSchema) });
  const onSubmit = (data) => {
    setLoading(true);
    setShowError(false);
    setShowSuccess(false);
    delete data.confirmPassword;
    dispatch(userThunk.changePasswordAPI(data))
      .unwrap()
      .then((value) => {
        setLoading(false);
        setShowSuccess(true);
        setMessage('Change password successfully!');
        reset();
      })
      .catch((value) => {
        setLoading(false);
        setShowError(true);
        setMessage(value);
      });
  };
  return (
    <UserPage>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ paddingLeft: '10px' }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            display="flex"
            alignItems="flex-start"
            spacing={1}
          >
            <MDTypography
              sx={{ color: '#323232', fontSize: '20px' }}
              fontWeight="medium"
            >
              Change password
            </MDTypography>
          </Stack>
          <MDTypography
            sx={{ color: '#323232', fontSize: '0.875rem', fontWeight: '500' }}
            variant="subtitle1"
          >
            For account security, please do not share your password with others
          </MDTypography>
        </Stack>
      </Stack>
      <Divider sx={{ width: '100%' }} />
      <Grid xs={12} container items sx={{ paddingLeft: '10px' }}>
        <Grid xs={3} spacing={2}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            spacing={4}
            sx={{ marginTop: '10px' }}
          >
            <MDTypography
              sx={{ color: '#323232', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Current password
            </MDTypography>
            <MDTypography
              sx={{ color: '#323232', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              New password
            </MDTypography>
            <MDTypography
              sx={{ color: '#323232', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Confirm new password
            </MDTypography>
          </Stack>
        </Grid>
        <Grid spacing={1} xs={4}>
          <Stack
            sx={{ marginLeft: '10px', marginTop: '5px' }}
            direction="column"
            justifyContent="center"
            spacing={2}
            alignItems="flex-start"
          >
            <MDBox>
              <MDInput
                required
                id="password"
                name="password"
                {...register('password')}
                error={errors.password ? true : false}
                type="password"
                label="Current password"
                variant="outlined"
                size="small"
                sx={{ width: '300px' }}
              />
              <Typography fontSize="13px" variant="inherit" color="primary">
                {errors.password?.message}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                id="newPassword"
                name="newPassword"
                {...register('newPassword')}
                error={errors.newPassword ? true : false}
                type="password"
                label="New password"
                variant="outlined"
                size="small"
                sx={{ width: '300px' }}
              />
              <Typography fontSize="13px" variant="inherit" color="primary">
                {errors.newPassword?.message}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                id="newConfirmPassword"
                name="newConfirmPassword"
                {...register('newConfirmPassword')}
                error={errors.newConfirmPassword ? true : false}
                type="password"
                label="Confirm new password"
                variant="outlined"
                size="small"
                sx={{ width: '300px' }}
              />
              <Typography fontSize="13px" variant="inherit" color="primary">
                {errors.newConfirmPassword?.message}
              </Typography>
            </MDBox>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {showError ? (
                <Typography fontSize="13px" variant="inherit" color="primary">
                  {message}
                </Typography>
              ) : null}
              {showSuccess ? (
                <Typography fontSize="13px" variant="inherit" color="success">
                  {message}
                </Typography>
              ) : null}

              {loading ? <CircularProgress color={'success'} /> : null}
            </Box>

            <MDButton
              color="dark"
              sx={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '2px 3px',
                borderRadius: '9px',
                marginRight: '3px',
                marginBottom: '3px',
                width: '30px',
                color: '#fff',
                backgroundColor: '#0b5394',
                textTransform: 'initial !important',
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Change
            </MDButton>
          </Stack>
        </Grid>
        <Grid spacing={2} xs={3}>
          <Stack
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{ marginTop: '10px' }}
          >
            <MDTypography
              sx={{
                color: '#323232',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: '600',
              }}
              fontWeight="regular"
            >
              Forgot password
            </MDTypography>
          </Stack>
        </Grid>
      </Grid>
    </UserPage>
  );
};

export default PasswordPage;
