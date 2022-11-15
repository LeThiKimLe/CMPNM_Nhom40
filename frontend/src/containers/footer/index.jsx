import React from 'react';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import qrCode from '../../assets/images/qr_code.png';
import qrAppStore from '../../assets/images/app_store.png';
import qrGooglePlay from '../../assets/images/google_play.png';
// react-router-dom components
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Stack } from '@mui/material';

function Footer({ light }) {
  return (
    <MDBox
      color="#222935"
      bgColor="#ffffff"
      borderRadius="none"
      opacity={1}
      sx={{ paddingBottom: '20px', paddingTop: '20px' }}
      display="flex"
      justifyContent="space-between"
    >
      {' '}
      <Container>
        <Grid
          xs={12}
          container
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Grid xs={3}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Cửa hàng trên ứng dụng
              </MDTypography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={2}
              >
                <img src={qrCode} alt="qr code" height="60px" />
                <Stack
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <img src={qrAppStore} alt="App Store" height="16px" />
                  <img src={qrGooglePlay} alt="Google Play" height="16px" />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={3}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Giới thiệu
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Giới thiệu
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Tuyển dụng
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Điều khoản
              </MDTypography>
            </Stack>
          </Grid>
          <Grid xs={3}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Chăm sóc khách hàng
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Trung tâm trợ giúp
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Shop Điện thoại
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Hướng dẫn mua hàng
              </MDTypography>
            </Stack>
          </Grid>
          <Grid xs={3}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Liên hệ
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                1050QL 1A Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Trung tâm trợ giúp
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  color: '#222935',
                  fontWeight: '400',
                }}
              >
                Hướng dẫn mua hàng
              </MDTypography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default Footer;
