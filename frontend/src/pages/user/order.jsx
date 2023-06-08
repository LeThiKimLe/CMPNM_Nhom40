import React, { useState, useEffect } from 'react';
import { Stack, Paper, CircularProgress, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import UserPage from './user-page';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import orderThunk from '../../features/order/order.service';
import OrderItem from './order-item';
import SimpleTabs from './order-tabs.jsx';

const OrderPage = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [orderList, setOrderList] = useState(order.orderList);
  const [indexSelected, setIndexSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const getStatus = (index) => {
    switch (index) {
      case 1:
        return 'pending';
      case 2:
        return 'packed';
      case 3:
        return 'shipping';
      case 4:
        return 'delivered';
      case 5:
        return 'cancelled';
      case 6:
        return 'refund';
      default:
        return 'all';
    }
  };
  useEffect(() => {
    if (indexSelected === 0) {
      dispatch(orderThunk.getAllOrder())
        .unwrap()
        .then((value) => {
          setOrderList(value.orders);
          setLoading(false);
        });
    } else {
      const status = getStatus(indexSelected);
      console.log(status);
      dispatch(orderThunk.getAllOrderByStatus(status))
        .unwrap()
        .then((value) => {
          console.log(value.orders);
          setOrderList(value.orders);
          setLoading(false);
        });
    }
  }, [dispatch, indexSelected]);

  return (
    <UserPage>
      <Grid
        container
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1.5}
        sx={{ paddingLeft: '8px', paddingRight: '0px' }}
      >
        {loading ? (
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <CircularProgress />
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                display="flex"
                alignItems="flex-start"
                spacing={1}
              >
                <ShoppingBagIcon
                  fontSize="medium"
                  color="error"
                  sx={{ marginTop: '3px' }}
                />
                <MDTypography
                  sx={{ color: '#444444', fontSize: '20px' }}
                  fontWeight="medium"
                >
                  Đơn mua của tôi
                </MDTypography>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '0px' }}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                display="flex"
                alignItems="flex-start"
                spacing={1}
              >
                <SimpleTabs
                  orderList={orderList}
                  loading={loading}
                  setIndexSelected={setIndexSelected}
                  indexSelected={indexSelected}
                />
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </UserPage>
  );
};

export default OrderPage;
