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
      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '10px' }}>
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
                  Giao hàng nhanh chóng
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Phí vận chuyển thấp
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
                  Đảm bảo tiền tệ
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Tiền sẽ được hoàn lại trong 7 ngày
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
                  Bảo hành
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Sản phẩm bảo hành 1 năm
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
                  Thanh toán
                </MDTypography>
                <MDTypography sx={{ color: '#444444', fontSize: '14px' }}>
                  Thanh toán bảo mật, tiện lợi
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
