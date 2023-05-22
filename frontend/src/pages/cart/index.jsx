/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Container, Paper, Stack, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import CartItem from '../../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../features/cart/cart.slice';
import MDButton from '../../components/MDButton';
import CircularProgress from '@mui/material/CircularProgress';
import { formatThousand } from '../../utils/custom-price';
import emptyCart from '../../assets/images/empty-cart.png';
import { Link, useNavigate } from 'react-router-dom';
import cartThunk from '../../features/cart/cart.service';
import { notification } from 'antd';
const columns = [
  {
    key: 'name',
    fieldName: 'Sản phẩm',
    index: 'name',
    width: 5,
  },
  {
    key: 'price',
    fieldName: 'Đơn giá',
    index: 'price',
    width: 3,
  },
  {
    key: 'quantity',
    fieldName: 'Số lượng',
    index: 'quantity',
    width: 1.5,
  },
  {
    key: 'totalPrice',
    fieldName: 'Số tiền',
    index: 'totalPrice',
    width: 1.5,
  },
  {
    key: 'action',
    fieldName: ' ',
    index: 'action',
    width: 2,
  },
];
function getTotalPrice(items) {
  let total = 0;
  items.map((item, index) => {
    const { salePrice, quantity } = item;
    const price = Number(salePrice) * quantity;
    total = total + price;
  });
  return total;
}
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const cartItemsLocal =
    localStorage.getItem('cartItems') == null
      ? null
      : JSON.parse(localStorage.getItem('cartItems'));
  const [getLoading, setGetLoading] = useState(false);
  const [items, setItems] = useState(
    cartItemsLocal === null ? [] : cartItemsLocal
  );
  const handleDelete = (id) => {
    setGetLoading(true);
    if (user.isLoggedIn) {
      dispatch(cartThunk.deleteCartItemAPI(id))
        .unwrap()
        .then(() => {
          return dispatch(cartThunk.getAllItemsAPI()).unwrap();
        })
        .then(() => {
          notification.success({
            message: 'Xóa sản phẩm thành công!',
            placement: 'top',
          });
          setGetLoading(false);
        });
    } else {
      console.log(id);
      dispatch(cartActions.deleteCartItemLocal(id));
      notification.success({
        message: 'Xóa sản phẩm thành công!',
        placement: 'top',
      });
      setTimeout(() => {
        setGetLoading(false);
      }, 1000);
    }
  };
  const handleCheckOut = () => {
    if (!user.isLoggedIn) {
      navigate('/sign-in');
    } else {
      navigate('/checkout');
    }
  };
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);
  if (getLoading) {
    return (
      <MDBox
        color="#000000"
        bgColor="Light"
        variant="contained"
        borderRadius="none"
        opacity={1}
        display="flex"
        justifyContent="flex-start"
        width="100%"
        alignItems="flex-start"
        minHeight="75vh"
      >
        <Container>
          <Grid
            sx={{ paddingTop: '15px' }}
            container
            spacing={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            <Stack display="flex" justifyContent="center" alignItems="center">
              <MDBox p={2}>
                <CircularProgress />
              </MDBox>
            </Stack>
          </Grid>
        </Container>
      </MDBox>
    );
  }
  return (
    <MDBox
      color="#000000"
      bgColor="Light"
      variant="contained"
      borderRadius="none"
      opacity={1}
      display="flex"
      justifyContent="flex-start"
      width="100%"
      alignItems="flex-start"
      minHeight="75vh"
    >
      <Container>
        {items.length > 0 ? (
          <Grid
            sx={{ paddingTop: '15px' }}
            container
            spacing={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            xs={12}
          >
            <Grid
              item
              xs={9}
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <MDBox variant="contained">
                <Paper elevation={3} sx={{ padding: '15px' }}>
                  <Stack
                    xs={12}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: '20px' }}
                  >
                    {columns.map((item) => {
                      return (
                        <Grid xs={item.width} key={item.index}>
                          {' '}
                          <MDTypography
                            sx={{
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: '#111111',
                            }}
                          >
                            {item.fieldName}
                          </MDTypography>
                        </Grid>
                      );
                    })}
                  </Stack>
                  <Divider />
                  {items.map((item, index) => {
                    return (
                      <div key={index}>
                        <CartItem
                          keyIndex={item._id}
                          product={item}
                          handleDelete={() => handleDelete(item._id)}
                        />
                        <Divider />
                      </div>
                    );
                  })}
                </Paper>
              </MDBox>
            </Grid>
            <Grid
              item
              xs={3}
              justifyContent="flex-end"
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
                      {cartItems.length} sản phẩm
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
                      Tổng tiền hàng:
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontSize: '14px',
                        color: '#990000',
                        fontWeight: '500',
                      }}
                    >
                      {formatThousand(getTotalPrice(items))}đ
                    </MDTypography>
                  </Stack>
                </Paper>
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
                    size="medium"
                    color="dark"
                    sx={{
                      textTransform: 'initial !important',
                      fontWeight: '500',
                      padding: '2px 10px',
                    }}
                    onClick={() => navigate('/')}
                  >
                    Tiếp tục mua hàng
                  </MDButton>
                  <MDButton
                    size="medium"
                    color="success"
                    sx={{
                      textTransform: 'initial !important',
                      fontWeight: '500',
                    }}
                    onClick={handleCheckOut}
                  >
                    Thanh toán
                  </MDButton>
                </Stack>
              </MDBox>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={11} sm={9} md={7} lg={6} xl={5}>
            <MDBox
              justifyContent="center"
              alignItems="center"
              display="flex"
              sx={{ marginTop: '50px' }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <img
                  src={emptyCart}
                  alt="tiep"
                  style={{
                    width: '30%',
                    marginRight: '30px',
                  }}
                />
                <MDTypography variant="h5" color="dark">
                  Giỏ hàng trống
                </MDTypography>
                <MDButton
                  fontWeight="bold"
                  fontSize="1rem"
                  color={'dark'}
                  component={Link}
                  to="/products"
                >
                  Tiếp tục mua hàng
                </MDButton>
              </Stack>
            </MDBox>
          </Grid>
        )}
      </Container>
    </MDBox>
  );
};

export default CartPage;
