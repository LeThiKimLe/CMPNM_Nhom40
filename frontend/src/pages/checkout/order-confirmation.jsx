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
      bgColor="#fff"
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
              <Paper
                elevation={2}
                sx={{
                  padding: '15px',
                  borderRadius: '13px',
                  boxShadow: '#dbd9d9 5px 5px 10px 10px',
                }}
              >
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
                  <MDTypography
                    sx={{
                      color: '#323232',
                      fontSize: '20px',
                      fontWeight: '600',
                    }}
                  >
                    Your order with code {state.id} has been completed!
                  </MDTypography>
                  <MDTypography
                    sx={{
                      color: '#323232',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                  >
                    You will receive a confirmation email with your order
                    details.
                  </MDTypography>
                  <MDButton
                    component={Link}
                    to="/user/order"
                    size="medium"
                    color="light"
                    sx={{
                      textTransform: 'initial !important',
                      fontWeight: '600',
                      color: '#46bcaa',
                      backgroundColor: '#edf8f7',
                      borderRadius: '8px',
                      boxShadow: '#dbd9d9 5px 5px 5px 5px',
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
