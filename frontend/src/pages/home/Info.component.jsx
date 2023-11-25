import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import { Stack, Paper } from '@mui/material';
import delivery from '../../assets/images/fast-delivery.png';
import money from '../../assets/images/money.png';
import history from '../../assets/images/history.png';
import payment from '../../assets/images/payment.png';
const InfoComponent = () => {
  return (
    <MDBox variant="contained" borderRadius="lg" width="100%">
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          marginBottom: '10px',
          boxShadow: '#808191 0px 10.8px 10px 0px',
          borderRadius: '13px',
        }}
      >
        <Grid
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          display="flex"
          spacing={2}
          xs={12}
        >
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <img src={delivery} alt="giao hang nhanh" width="60px" />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Fast shipping
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Low shipping fee
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <img src={money} alt="Đảm bảo tiền" width="60px" />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Monetary guarantee
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Money will be refunded within a week
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <img src={history} alt="Bảo hành" width="60px" />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Guarantee
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  One year warranty products
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <img src={payment} alt="Thanh toán" width="60px" />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Payment
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Secure and convenient payment
                </MDTypography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </MDBox>
  );
};

export default InfoComponent;
