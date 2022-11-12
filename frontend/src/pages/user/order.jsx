import React, { useState, useEffect } from 'react';
import { Stack, Paper, CircularProgress, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import UserPage from './user-page';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { formatThousand } from '../../utils/custom-price';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import orderThunk from '../../features/order/order.service';
import OrderItem from './order-item';
const columns = [
  {
    key: 'id',
    fieldName: 'Mã đơn',
    index: 'id',
    width: 3.5,
  },
  {
    key: 'status',
    fieldName: 'Trạng thái',
    index: 'status',
    width: 2.5,
  },
  {
    key: 'datePurchased',
    fieldName: 'Ngày đặt hàng',
    index: 'datePurchased',
    width: 2.5,
  },
  {
    key: 'totalAmount',
    fieldName: 'Tổng đơn',
    index: 'totalAmount',
    width: 2.5,
  },
  {
    key: 'action',
    fieldName: ' ',
    index: 'action',
    width: 1,
  },
];
const OrderPage = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [orderList, setOrderList] = useState(order.orderList);
  useEffect(() => {
    dispatch(orderThunk.getAllOrder())
      .unwrap()
      .then((value) => {
        setOrderList(value.orders);
      });
  }, [dispatch]);

  return (
    <UserPage>
      <Grid
        container
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1.5}
      >
        {order.loading ? (
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
            {orderList.length > 0 ? (
              <>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{ paddingLeft: '20px' }}
                  >
                    {columns.map((item) => {
                      return (
                        <Grid xs={item.width} key={item.index}>
                          {' '}
                          <MDTypography
                            sx={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#7d879c',
                            }}
                          >
                            {item.fieldName}
                          </MDTypography>
                        </Grid>
                      );
                    })}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Box variant="contained">
                    {orderList.map((item, index) => {
                      return (
                        <div key={index}>
                          <OrderItem
                            id={item._id}
                            totalAmount={item.totalAmount}
                            orderStatus={item.orderStatus}
                          />
                        </div>
                      );
                    })}
                  </Box>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Stack
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <MDTypography variant="h4" color="primary">
                    {`Bạn chưa có đơn hàng nào!`}
                  </MDTypography>
                  <MDButton
                    component={Link}
                    to="/"
                    size="medium"
                    color="primary"
                    sx={{
                      textTransform: 'initial !important',
                      fontWeight: '500',
                    }}
                  >
                    Đến trang chủ
                  </MDButton>
                </Stack>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </UserPage>
  );
};

export default OrderPage;
