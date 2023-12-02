/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Container, Paper, Stack, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import CartItem from '../../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';

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
    fieldName: 'Name',
    index: 'name',
    width: 5,
  },
  {
    key: 'price',
    fieldName: 'Price',
    index: 'price',
    width: 3,
  },
  {
    key: 'quantity',
    fieldName: 'Quantity',
    index: 'quantity',
    width: 1.5,
  },
  {
    key: 'totalPrice',
    fieldName: 'Total price',
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

  const [getLoading, setGetLoading] = useState(true);
  const [items, setItems] = useState([]);
  const handleDelete = (id) => {
    setGetLoading(true);
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
    setTimeout(() => {
      setGetLoading(false);
    }, 1000);
  }, [cartItems]);
  if (getLoading) {
    return (
      <MDBox
        color="#000000"
        bgColor="#fff"
        variant="contained"
        borderRadius="none"
        opacity={1}
        paddingTop="10px"
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
      bgColor="#fff"
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
                <Paper
                  elevation={3}
                  sx={{
                    padding: '15px',
                    borderRadius: '13px',
                    boxShadow: '#dbd9d9 5px 5px 5px 5px',
                  }}
                >
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
                              fontWeight: 600,
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
                <Paper
                  elevation={3}
                  sx={{
                    padding: '15px',
                    borderRadius: '13px',
                    boxShadow: '#dbd9d9 5px 5px 5px 5px',
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: '5px' }}
                  >
                    <MDTypography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111111',
                      }}
                    >
                      Total
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111111',
                      }}
                    >
                      {cartItems.length} products
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
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111111',
                      }}
                    >
                      Total price
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
                    color="light"
                    sx={{
                      textTransform: 'initial',
                      fontWeight: 600,
                      color: '#46bcaa',
                      fontSize: '13px',
                      padding: '4px 10px',
                      backgroundColor: '#edf0ff',
                      borderRadius: '8px',
                      boxShadow: '#dbd9d9 5px 5px 5px 5px',
                    }}
                    onClick={() => navigate('/')}
                  >
                    Continue shopping
                  </MDButton>
                  <MDButton
                    size="medium"
                    color="light"
                    sx={{
                      textTransform: 'initial',
                      fontWeight: 600,
                      color: '#4d69fa',
                      fontSize: '13px',
                      padding: '4px 10px',
                      backgroundColor: '#edf0ff',
                      borderRadius: '8px',
                      boxShadow: '#dbd9d9 5px 5px 5px 5px',
                    }}
                    onClick={handleCheckOut}
                  >
                    Payment
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
                <MDTypography
                  sx={{
                    color: '#323232',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Cart is empty
                </MDTypography>
                <MDButton
                  fontWeight="bold"
                  fontSize="1rem"
                  color={'light'}
                  component={Link}
                  to="/products?category=all"
                  size="medium"
                  sx={{
                    textTransform: 'initial',
                    fontWeight: 600,
                    color: '#46bcaa',
                    fontSize: '13px',
                    padding: '4px 5px',
                    backgroundColor: '#edf0ff',
                    borderRadius: '8px',
                    boxShadow: '#dbd9d9 5px 5px 5px 5px',
                  }}
                >
                  Continue shopping
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
