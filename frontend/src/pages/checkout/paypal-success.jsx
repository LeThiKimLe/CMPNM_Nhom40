/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import orderThunk from '../../features/order/order.service';
import { cartActions } from '../../features/cart/cart.slice';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import orderComplete from '../../assets/images/order_completed.png';
import { Container, Paper, Stack, CircularProgress } from '@mui/material';
import { notification } from 'antd';
const PaypalSuccessPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState('');
  const data = JSON.parse(localStorage.getItem('orderPaypal'));
  console.log(data);
  const orderCod = JSON.parse(localStorage.getItem('orderCodMomo'));
  const paymentId = searchParams.get('paymentId');
  const PayerID = searchParams.get('PayerID');
  const { total, details } = data.amount;
  const { shipping, shipping_discount, subtotal } = details;
  useEffect(() => {
    dispatch(
      orderThunk.paymentPaypalSuccess({
        paymentId,
        PayerID,
        total,
        shipping,
        shipping_discount,
        subtotal,
      })
    )
      .unwrap()
      .then((value) => {
        console.log('chay goai');
        if (value.success) {
          console.log('chay');
          return dispatch(orderThunk.addOrderPaypalAPI(orderCod)).unwrap();
        }
      })
      .then((value) => {
        setLoading(false);
        setOrderId(value.orderFull._id);
        notification.success({ message: 'Order successfully!' });
        dispatch(cartActions.reset());
      })
      .catch(() => {});
  }, []);

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
          {!loading ? (
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
                      {`Đơn hàng có mã ${orderId} của bạn đã hoàn thành!`}
                    </MDTypography>
                    <MDTypography variant="body1" color="dark">
                      You will receive a confirmation email with your order
                      details.
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
                      Go to order
                    </MDButton>
                  </Stack>
                </Paper>
              </MDBox>
            </Grid>
          ) : (
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <CircularProgress />
            </MDBox>
          )}
        </Grid>
      </Container>
    </MDBox>
  );
};

export default PaypalSuccessPage;
