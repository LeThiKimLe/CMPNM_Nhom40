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
      .required('Vui lòng nhập mật khẩu!')
      .min(6, 'Mật khẩu phải ít nhất 6 ký tự!')
      .max(40, 'Mật khẩu không được nhiều hơn 40 ký tự!'),
    newPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu!')
      .min(6, 'Mật khẩu phải ít nhất 6 ký tự!')
      .max(40, 'Mật khẩu không được nhiều hơn 40 ký tự!'),
    newConfirmPassword: Yup.string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Xác nhập mật khẩu không trùng khớp'
      ),
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
        setMessage('Đổi mật khẩu thành công!');
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
              sx={{ color: '#444444', fontSize: '20px' }}
              fontWeight="medium"
            >
              Đổi Mật Khẩu
            </MDTypography>
          </Stack>
          <MDTypography
            sx={{ color: '#444444', fontSize: '0.875rem' }}
            fontWeight="regular"
            variant="subtitle1"
          >
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
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
              sx={{ color: '#757575', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Mật mật khẩu hiện tại
            </MDTypography>
            <MDTypography
              sx={{ color: '#757575', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Mật khẩu mới
            </MDTypography>
            <MDTypography
              sx={{ color: '#757575', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Xác nhận mật khẩu
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
                label="Mật khẩu"
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
                label="Mật khẩu mới"
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
                label="Nhập lại mật khẩu mới"
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
              size="medium"
              color="dark"
              sx={{
                textTransform: 'initial !important',
                fontWeight: '500',
                padding: '2px 10px',
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Xác nhận
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
                color: '#757575',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: '600',
              }}
              fontWeight="regular"
            >
              Quên mật khẩu
            </MDTypography>
          </Stack>
        </Grid>
      </Grid>
    </UserPage>
  );
};

export default PasswordPage;
