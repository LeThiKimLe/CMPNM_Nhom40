import { Container, Paper, Stack } from '@mui/material';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import orderComplete from '../../assets/images/order_completed.png';
const OrderConfirmation = () => {
  const { state } = useLocation();
  console.log(state.id);
  return (
    <MDBox
      color="#000000"
      bgColor="Light"
      variant="contained"
      borderRadius="none"
      opacity={1}
      p={1}
      display="flex"
      justifyContent="center"
      width="100%"
      minHeight="75vh"
    >
      <Container>
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingTop: '15px' }}
        >
          <Grid item xs={8} justifyContent="center" alignItems="center">
            <MDBox variant="contained">
              <Paper elevation={2} sx={{ padding: '15px' }}>
                <div style={{ marginBottom: '40px', marginTop: '30px' }}>
                  <img
                    src={orderComplete}
                    alt="tiep"
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: '30%',
                    }}
                  />
                </div>
                <Stack
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <MDTypography variant="h4" color="primary">
                    {`Đơn hàng có mã ${state.id} của bạn đã hoàn thành!`}
                  </MDTypography>
                  <MDTypography variant="body1" color="dark">
                    Bạn sẽ nhận được email xác nhận với các chi tiết đơn hàng.
                  </MDTypography>
                  <MDButton
                    component={Link}
                    to="/user/order"
                    size="medium"
                    color="primary"
                    sx={{
                      textTransform: 'initial !important',
                      fontWeight: '500',
                    }}
                  >
                    Đến đơn hàng
                  </MDButton>
                </Stack>
              </Paper>
            </MDBox>
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default OrderConfirmation;
