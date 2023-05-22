import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserPage from './user-page';
import { Stack, Paper, Divider, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import MDBox from '../../components/MDBox';
import CustomizedSteppers from './order-status';
import { formatThousand } from '../../utils/custom-price';
import { useDispatch } from 'react-redux';
import orderThunk from '../../features/order/order.service';
import OrderDetailItem from './order-detail-item';
import { notification } from 'antd';
import userThunk from '../../features/user/user.service';
function getTotalPrice(items) {
  let total = 0;
  items.map((item, index) => {
    const { price, purchasedQty } = item;
    const itemPrice = Number(price) * purchasedQty;
    total = total + itemPrice;
  });
  return total;
}
const OrderDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location?.pathname.split('/')[3];
  console.log('orderId', orderId);
  const [orderSelected, setOrderSelected] = useState({});
  const [dateDelivered, setDateDelivered] = useState('');
  const [loading, setLoading] = useState(true);

  const handleCancelOrder = () => {
    setLoading(true);
    dispatch(userThunk.cancelOrderAPI({ orderId, status: 'cancelled' }))
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Cập nhật trạng thái đơn hàng thành công',
          placement: 'top',
        });
        dispatch(orderThunk.getOrder(orderId))
          .unwrap()
          .then((value) => {
            setDateDelivered(
              new Date(
                value.order.orderStatus[value.order.orderStatus.length - 1].date
              )
            );

            setLoading(false);
            setOrderSelected(value.order);
          });
      });
  };

  useEffect(() => {
    if (orderId) {
      dispatch(orderThunk.getOrder(orderId))
        .unwrap()
        .then((value) => {
          console.log(value.order);
          setDateDelivered(
            new Date(
              value.order.orderStatus[value.order.orderStatus.length - 1].date
            )
          );
          setLoading(false);
          console.log(value.order);
          setOrderSelected(value.order);
        });
    }
  }, [dispatch, orderId]);

  return (
    <UserPage>
      {loading ? (
        <MDBox display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress />
        </MDBox>
      ) : orderSelected ? (
        <>
          <Grid
            container
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1.5}
          >
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                display="flex"
                alignItems="center"
                spacing={1}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  display="flex"
                  alignItems="flex-start"
                  spacing={1}
                >
                  {' '}
                  <ShoppingBagIcon
                    fontSize="medium"
                    color="error"
                    sx={{ marginTop: '3px' }}
                  />
                  <MDTypography
                    sx={{ color: '#444444', fontSize: '20px' }}
                    fontWeight="medium"
                  >
                    Chi tiết đơn hàng
                  </MDTypography>
                </Stack>
                {orderSelected.orderStatus &&
                orderSelected.orderStatus[orderSelected.orderStatus.length - 1]
                  .type == 'delivered' ? (
                  <MDButton
                    size="medium"
                    color="warning"
                    sx={{
                      textTransform: 'initial !important',
                      fontWeight: '500',
                      padding: '2px 10px',
                    }}
                  >
                    Mua lần nữa
                  </MDButton>
                ) : null}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <MDBox variant="contained" bgColor="light">
                <CustomizedSteppers
                  stepActive={orderSelected.orderStatus.length - 1}
                  orderStatus={orderSelected.orderStatus}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12}>
              <MDBox variant="contained" bgColor="light">
                <Paper elevation={2} sx={{ padding: '10px 10px' }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={4}>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {' '}
                        <MDTypography
                          sx={{
                            color: '#7d879c',
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                        >
                          Mã đơn hàng:
                        </MDTypography>
                        <MDTypography
                          sx={{
                            color: '#2b3445',
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                        >
                          {orderSelected._id}
                        </MDTypography>
                      </Stack>
                    </Grid>
                    <Grid xs={4}>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {' '}
                        <MDTypography
                          sx={{
                            color: '#7d879c',
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                        >
                          Ngày đặt hàng:
                        </MDTypography>
                        <MDTypography
                          sx={{
                            color: '#2b3445',
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                        >
                          {new Date(
                            orderSelected.orderStatus[0].date
                          ).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: '2-digit',
                            day: 'numeric',
                          })}
                        </MDTypography>
                      </Stack>
                    </Grid>
                    {orderSelected.orderStatus[
                      orderSelected.orderStatus.length - 1
                    ].type === 'delivered' ? (
                      <Grid xs={4}>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          justifyContent="center"
                          alignItems="center"
                        >
                          {' '}
                          <MDTypography
                            sx={{
                              color: '#7d879c',
                              fontSize: '14px',
                              fontWeight: '500',
                            }}
                          >
                            Ngày giao hàng
                          </MDTypography>
                          <MDTypography
                            sx={{
                              color: '#2b3445',
                              fontSize: '14px',
                              fontWeight: '500',
                            }}
                          >
                            {new Date(
                              orderSelected.orderStatus[
                                orderSelected.orderStatus.length - 1
                              ].date
                            ).toLocaleDateString('en-AU', {
                              year: 'numeric',
                              month: '2-digit',
                              day: 'numeric',
                            })}
                          </MDTypography>
                        </Stack>
                      </Grid>
                    ) : null}
                    {orderSelected.orderStatus[
                      orderSelected.orderStatus.length - 1
                    ].type !== 'delivered' &&
                    orderSelected.orderStatus[
                      orderSelected.orderStatus.length - 1
                    ].type !== 'cancelled' &&
                    orderSelected.orderStatus[
                      orderSelected.orderStatus.length - 1
                    ].type !== 'refund' ? (
                      <Grid xs={4}>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          justifyContent="center"
                          alignItems="center"
                        >
                          {' '}
                          <MDTypography
                            sx={{
                              color: '#7d879c',
                              fontSize: '14px',
                              fontWeight: '500',
                            }}
                          >
                            Ngày giao hàng dự kiến:
                          </MDTypography>
                          <MDTypography
                            sx={{
                              color: '#2b3445',
                              fontSize: '14px',
                              fontWeight: '500',
                            }}
                          >
                            {new Date(
                              dateDelivered.setDate(dateDelivered.getDate() + 7)
                            ).toLocaleDateString('en-AU', {
                              year: 'numeric',
                              month: '2-digit',
                              day: 'numeric',
                            })}
                          </MDTypography>
                        </Stack>
                      </Grid>
                    ) : null}
                  </Stack>
                  <Divider sx={{ width: '100%' }} />
                  {orderSelected.items.map((item, index) => {
                    return <OrderDetailItem key={index} item={item} />;
                  })}
                </Paper>
              </MDBox>
            </Grid>
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{
                paddingTop: '10px',
                paddingLeft: '5px',
                paddingRight: '5px',
              }}
              spacing={2}
              xs={12}
            >
              <Grid
                item
                xs={8}
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <MDBox variant="contained">
                  <Paper elevation={3} sx={{ padding: '15px' }}>
                    <Stack
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                      sx={{ marginBottom: '5px' }}
                    >
                      <MDTypography
                        sx={{
                          color: '#444444',
                          fontSize: '14px',
                          fontWeight: '500',
                        }}
                      >
                        Địa chỉ giao hàng
                      </MDTypography>
                      <MDTypography
                        sx={{
                          color: '#5b5b5b',
                          fontSize: '14px',
                          fontWeight: '400',
                        }}
                      >
                        {orderSelected.address.name} -{' '}
                        {orderSelected.address.address},{' '}
                        {orderSelected.address.wardName},{' '}
                        {orderSelected.address.districtName},{' '}
                        {orderSelected.address.provinceName}
                      </MDTypography>
                    </Stack>
                    <Stack
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                      sx={{ marginBottom: '5px', marginTop: '15px' }}
                    >
                      <MDTypography
                        sx={{
                          color: '#444444',
                          fontSize: '14px',
                          fontWeight: '500',
                        }}
                      >
                        Phương thức thanh toán
                      </MDTypography>
                      <MDTypography
                        sx={{
                          color: '#5b5b5b',
                          fontSize: '14px',
                          fontWeight: '400',
                        }}
                      >
                        {orderSelected.paymentType === 'momo'
                          ? 'Thanh toán qua ví điện tử Momo'
                          : orderSelected.paymentType === 'cod'
                          ? 'Thanh toán khi nhận hàng'
                          : 'Thanh toán qua ví điện tử Paypal'}
                      </MDTypography>
                    </Stack>
                  </Paper>
                </MDBox>
              </Grid>
              <Grid
                item
                xs={4}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <MDBox variant="contained">
                  <Paper elevation={3} sx={{ padding: '15px' }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      sx={{ marginBottom: '5px' }}
                    >
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="h4"
                      >
                        Tổng cộng
                      </MDTypography>
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="h4"
                      >
                        {orderSelected.items.length} sản phẩm
                      </MDTypography>
                    </Stack>

                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      sx={{ marginBottom: '5px' }}
                    >
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="body"
                      >
                        Tổng tiền hàng:
                      </MDTypography>
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="body1"
                      >
                        {formatThousand(getTotalPrice(orderSelected.items))}đ
                      </MDTypography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      sx={{ marginBottom: '5px' }}
                    >
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="body"
                      >
                        Tổng phí vận chuyển:
                      </MDTypography>
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="body1"
                      >
                        {' '}
                        {formatThousand(orderSelected.shipAmount)}đ
                      </MDTypography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      sx={{ marginBottom: '5px' }}
                    >
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="body"
                      >
                        Tổng phí vận chuyển:
                      </MDTypography>
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="body1"
                      >
                        {' '}
                        - {formatThousand(orderSelected.freeShip)}đ
                      </MDTypography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px', fontWeight: '500' }}
                        variant="body"
                      >
                        Tổng thanh toán:
                      </MDTypography>
                      <MDTypography
                        sx={{
                          fontSize: '14px',
                          color: '#990000',
                          fontWeight: '500',
                        }}
                      >
                        {formatThousand(orderSelected.totalAmount)}đ
                      </MDTypography>
                    </Stack>
                  </Paper>
                  {orderSelected.orderStatus.length === 1 ? (
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      sx={{
                        marginTop: '20px',
                      }}
                    >
                      <MDButton
                        color="primary"
                        sx={{
                          width: '100%',
                          textTransform: 'initial !important',
                          fontWeight: '500',
                        }}
                        onClick={handleCancelOrder}
                      >
                        Hủy đơn
                      </MDButton>
                    </Stack>
                  ) : null}
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : null}
    </UserPage>
  );
};

export default OrderDetails;
