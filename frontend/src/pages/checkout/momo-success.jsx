/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../features/cart/cart.slice';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import orderThunk from '../../features/order/order.service';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import orderComplete from '../../assets/images/order_completed.png';
import { Container, Paper, Stack, CircularProgress } from '@mui/material';
import { notification } from 'antd';
const MomoSuccessPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderExtra = localStorage.getItem('orderCodMomo');
  const partnerCode = searchParams.get('partnerCode');
  const orderId = searchParams.get('orderId');
  const requestId = searchParams.get('requestId');
  const amount = searchParams.get('amount');
  const orderInfo = searchParams.get('orderInfo');
  const orderType = searchParams.get('orderType');
  const transId = searchParams.get('transId');
  const resultCode = searchParams.get('resultCode');
  const message = searchParams.get('message');
  const payType = searchParams.get('payType');
  const responseTime = searchParams.get('responseTime');
  const extraData = searchParams.get('extraData');
  const signature = searchParams.get('signature');
  const orderData = {
    orderId,
    requestId,
    orderInfo,
    orderType,
    orderExtra,
    transId,
    amount,
    resultCode,
    message,
    payType,
    signature,
    responseTime,
    extraData,
  };
  useEffect(() => {
    dispatch(orderThunk.checkResponseMomo(orderData))
      .unwrap()
      .then((value) => {
        const { orderFull } = value;
        setId(orderFull._id);
        setLoading(false);
        notification.success({ message: 'Đặt hàng thành công!' });
        localStorage.removeItem('orderCodMomo');
        dispatch(cartActions.reset());
      });
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
                      {`Đơn hàng có mã ${id} của bạn đã hoàn thành!`}
                    </MDTypography>
                    <MDTypography variant="body1" color="dark">
                      Bạn sẽ nhận được email xác nhận với các chi tiết đơn hàng.
                    </MDTypography>
                    <MDButton
                      component={Link}
                      to="/user/order"
                      size="medium"
                      color="dark"
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

export default MomoSuccessPage;
