/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Stack,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import CartItem from '../../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, selectCartItems } from '../../features/cart/cart.slice';
import BottomNavigation from '@mui/material/BottomNavigation';
import MDButton from '../../components/MDButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import { formatThousand } from '../../utils/custom-price';
import emptyCart from '../../assets/images/empty-cart.png';
import Header from '../../containers/header';
import Navbar from '../../containers/navbar';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../containers/footer';
import { selectIsLoggedIn } from '../../features/user/user.slice';
import cartThunk from '../../features/cart/cart.service';
import { getAllCartItemsDetail } from '../../utils/custom-products';
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
    const { product, quantity } = item;
    const price = Number(product.salePrice) * quantity;
    total = total + price;
  });
  return total;
}
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const data = useSelector((state) => state.data);
  const { products } = data;
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const cartItemsLocal =
    localStorage.getItem('cartItems') == null
      ? null
      : JSON.parse(localStorage.getItem('cartItems'));
  const [items, setItems] = useState(
    cartItemsLocal === null ? [] : cartItemsLocal
  );
  const [shipPrice, setShipPrice] = useState(100000);
  const handleDelete = (id) => {
    if (user.isLoggedIn) {
      dispatch(cartThunk.deleteCartItemAPI(id))
        .unwrap()
        .then(() => {
          dispatch(cartThunk.getAllItemsAPI());
        });
    } else {
      dispatch(cartActions.deleteCartItemLocal({ productId: id }));
    }
  };
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems, user.isLoggedIn, cartItemsLocal]);

  return (
    <>
      {items && items.length > 0 ? (
        <MDBox
          color="#000000"
          bgColor="#ffffff"
          variant="contained"
          borderRadius="none"
          opacity={1}
          p={1}
          display="flex"
          justifyContent="flex-start"
          width="100%"
          minHeight="80vh"
        >
          <Container>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                marginBottom: '20px',
                marginTop: '30px',
                paddingLeft: '10px',
              }}
            >
              <MDTypography color="dark" variant="h5">
                Giỏ hàng - {cartItems.length} sản phẩm
              </MDTypography>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent="space-between"
              item
              xs={12}
            >
              <Grid
                item
                xs={9}
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <MDBox p={1} variant="contained">
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
                    {items
                      ? items.map((item, index) => {
                          const { product, quantity } = item;
                          return (
                            <>
                              <CartItem
                                key={index}
                                keyIndex={product?._id}
                                product={product}
                                quantity={quantity}
                                handleDelete={() => handleDelete(product._id)}
                              />
                              <Divider />
                            </>
                          );
                        })
                      : null}
                  </Paper>
                </MDBox>
              </Grid>
              {items && items.length > 0 ? (
                <Grid
                  item
                  xs={3}
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  <MDBox p={1} variant="contained">
                    <Paper elevation={3} sx={{ padding: '15px' }}>
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="h4"
                      >
                        Tổng cộng
                      </MDTypography>
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
                          {formatThousand(getTotalPrice(items))}đ
                        </MDTypography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <MDTypography
                          color="dark"
                          sx={{ fontSize: '14px' }}
                          variant="body"
                        >
                          Phí vận chuyển:
                        </MDTypography>
                        <MDTypography
                          color="dark"
                          sx={{ fontSize: '14px' }}
                          variant="body1"
                        >
                          {formatThousand(shipPrice)}đ
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
                          {formatThousand(getTotalPrice(items) + shipPrice)}đ
                        </MDTypography>
                      </Stack>
                    </Paper>
                  </MDBox>
                </Grid>
              ) : null}
            </Grid>
          </Container>
          <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <Container>
              <BottomNavigation sx={{ minWidth: '100vh' }}>
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-between"
                  item
                  xs={12}
                >
                  <IconButton
                    color="dark"
                    size="small"
                    onClick={() => navigate('/')}
                  >
                    <ArrowBackIosIcon />
                    <MDTypography
                      sx={{
                        fontSize: '14px',
                        color: '#000000',
                        marginLeft: '15px',
                        fontWeight: '500',
                      }}
                    >
                      Tiếp tục mua sắm
                    </MDTypography>
                  </IconButton>
                  <IconButton color="dark" size="small">
                    <MDTypography
                      sx={{
                        fontSize: '14px',
                        color: '#000000',
                        marginRight: '15px',
                        fontWeight: '500',
                      }}
                    >
                      Thanh toán
                    </MDTypography>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Grid>
              </BottomNavigation>
            </Container>
          </Paper>
        </MDBox>
      ) : (
        <MDBox
          width="100vw"
          height="80%"
          minHeight="100vh"
          sx={{ overflowX: 'hidden' }}
        >
          <MDBox position="absolute" width="100%" minHeight="100vh" />
          <MDBox width="100%" height="100vh" mx="auto">
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              height="60%"
            >
              <Grid item xs={11} sm={9} md={7} lg={6} xl={5}>
                <MDBox
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
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
                      to="/notification"
                    >
                      Tiếp tục mua hàng
                    </MDButton>
                  </Stack>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <Footer dark />
        </MDBox>
      )}
    </>
  );
};

export default CartPage;
