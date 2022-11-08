import { Divider, Stack, Chip } from '@mui/material';
import React from 'react';
import MDTypography from '../../components/MDTypography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
const AccountComponent = () => {
  return (
    <>
      <Stack
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ paddingLeft: '10px' }}
      >
        <MDTypography
          sx={{ color: '#444444' }}
          fontWeight="medium"
          variant="h5"
        >
          Hồ sơ của tôi
        </MDTypography>
        <MDTypography
          sx={{ color: '#444444', fontSize: '0.875rem' }}
          fontWeight="regular"
          variant="subtitle1"
        >
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </MDTypography>
      </Stack>

      <Divider sx={{ width: '100%' }} />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            spacing={2}
          >
            <MDTypography
              sx={{ color: '#999999', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Tên:
            </MDTypography>
            <MDTypography
              sx={{ color: '#999999', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Email:
            </MDTypography>
            <MDTypography
              sx={{ color: '#999999', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Số điện thoại:
            </MDTypography>
            <MDTypography
              sx={{ color: '#999999', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Giới tính:
            </MDTypography>
            <MDTypography
              sx={{ color: '#999999', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Ngày sinh:
            </MDTypography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <MDTypography
              sx={{ color: '#444444', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              Nguyễn Bùi Tiệp
            </MDTypography>
            <MDTypography
              sx={{ color: '#444444', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              buitiep18110379@gmail.com
            </MDTypography>
            <MDTypography
              sx={{ color: '#444444', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              0334943334
            </MDTypography>
            <Chip label="nam" size="small" color="warning"></Chip>
            <MDTypography
              sx={{ color: '#444444', fontSize: '0.875rem' }}
              fontWeight="regular"
            >
              09/04/2000
            </MDTypography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountComponent;
