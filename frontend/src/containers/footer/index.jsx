import React from 'react';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import qrCode from '../../assets/images/qr_code.png';
import qrAppStore from '../../assets/images/app_store.png';
import qrGooglePlay from '../../assets/images/google_play.png';
// react-router-dom components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Stack } from '@mui/material';

function Footer() {
  return (
    <MDBox
      color="#323232"
      bgColor="#ffffff"
      borderRadius="none"
      opacity={1}
      sx={{
        paddingBottom: '20px',
        paddingTop: '20px',
        boxShadow: '0px -5px 10px #bcbcbc',
        color: '#808191',
      }}
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
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Store on the app
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
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Introduce
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Introduce
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Recruitment
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Rules
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
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Customer care
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Help Center
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Phone Shop
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Shopping guide
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
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Contact
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                1050 National Highway 1A Linh Trung Ward, City. Thu Duc, City.
                Ho Chi Minh
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Help Center
              </MDTypography>
              <MDTypography
                sx={{
                  fontSize: '13px',
                  color: '#323232',
                  fontWeight: '500',
                }}
              >
                Shopping guide
              </MDTypography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default Footer;
