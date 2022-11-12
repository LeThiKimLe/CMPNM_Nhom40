/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Container, Stack, Divider, CircularProgress } from '@mui/material';
import { notification } from 'antd';
import Breadcrumbs from '../../components/CustomBreadcrumbs';
import MDBox from '../../components/MDBox';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import { formatThousand } from '../../utils/custom-price';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { cartActions, selectCartItems } from '../../features/cart/cart.slice';
import { selectIsLoggedIn } from '../../features/user/user.slice';
import cartThunk from '../../features/cart/cart.service';
const SingleProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const { colors } = data;
  const id = location.state?.id;
  const name = location.state?.name;
  const product = location.state?.product;
  const option = location.state?.option;
  const ram = location.state?.ram;
  const storage = location.state?.storage;
  const rams = location.state?.rams;
  const colorGroup = location.state?.colors;
  const storages = location.state?.storages;
  const optionSelect = location.state?.optionSelected;
  const productGroup = location.state?.productGroup;

  const category = location.pathname.split('/')[2];
  // init state
  const [ramSelected, setRamSelected] = useState(ram);
  const [storageSelected, setStorageSelected] = useState(storage);
  const [optionSelected, setOptionSelected] = useState(optionSelect);
  const [colorSelected, setColorSelected] = useState(colorGroup[0]);

  const [amount, setAmount] = useState(1);
  // select state
  const [productSelected, setProductSelected] = useState(product);

  const handleAddItemToCart = () => {
    if (isLoggedIn) {
      let newCartItem = { product: productSelected._id, quantity: amount };

      dispatch(
        cartThunk.addToCartAPI({
          cartItem: newCartItem,
        })
      )
        .unwrap()
        .then(() => {
          notification.success({
            message: 'Đã thêm sản phẩm vào giỏ hàng!',
            placement: 'top',
          });
          dispatch(cartThunk.getAllItemsAPI());
        });
    } else {
      dispatch(
        cartActions.addToCartItemLocal({ product: productSelected, amount })
      );
    }
  };

  //* useEffect handle init page

  useEffect(() => {
    if (option.length === storages.length) {
      rams.map((item, index) => {
        if (optionSelected === index) {
          setRamSelected(item);
        }
      });
      setStorageSelected(storages[optionSelected]);
    } else {
      option.map((item, index) => {
        if (index === optionSelected) {
          setRamSelected(item.split('-')[0]);
          setStorageSelected(item.split('-')[1]);
        }
      });
    }
  }, [category, colors, optionSelected, rams, option, storages]);
  // handle option
  useEffect(() => {
    if (productGroup) {
      productGroup.map((item) => {
        const {
          detailsProduct: { ram, storage },
          color,
        } = item;
        if (
          ram === ramSelected &&
          storage === storageSelected &&
          color === colorSelected
        ) {
          setProductSelected(item);
          return;
        }
      });
    }
  }, [storageSelected, ramSelected, productGroup, colorSelected]);
  return (
    <MDBox
      color="#000000"
      bgColor="#ffffff"
      variant="contained"
      width="100vw"
      height="100%"
      sx={{ overflowX: 'hidden' }}
      p={1}
    >
      {productSelected ? (
        <Container>
          <Grid container justifyContent="flex-start" alignItems="center">
            <Breadcrumbs title={`Điện thoại ${name}`} url={id} />
          </Grid>
          <Grid>
            <MDTypography sx={{ color: '#111111' }}>
              {`${productSelected.name} ${ramSelected}`}
            </MDTypography>
          </Grid>
          <Divider sx={{ borderBottomWidth: '45px' }} flexItem />
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            item
            xs={12}
          >
            <Grid
              item
              xs={7}
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <MDBox variant="contained" p={2}>
                <img
                  width="250px"
                  height="300px"
                  src={productSelected.productPictures[0]}
                  alt={productSelected.name}
                />
              </MDBox>
            </Grid>
            <Grid
              item
              xs={5}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <MDBox variant="contained">
                  {option
                    ? option.map((item, index) => {
                        return (
                          <MDButton
                            key={index}
                            variant="contained"
                            size="small"
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: '400',
                              padding: '2px 10px',
                              border:
                                optionSelected === index
                                  ? '2px solid #2F4F4F'
                                  : '1px solid #2F4F4F',
                              borderRadius: '0.3rem',
                              marginRight: '5px',
                              color: '#2F4F4F',
                            }}
                            onClick={() => setOptionSelected(index)}
                          >
                            {item}
                          </MDButton>
                        );
                      })
                    : null}
                </MDBox>
                <MDBox variant="contained">
                  {colorGroup
                    ? colorGroup.map((item, index) => {
                        for (let color of colors) {
                          if (color.value === item) {
                            return (
                              <MDButton
                                key={index}
                                variant="contained"
                                size="small"
                                sx={{
                                  fontSize: '0.75rem',
                                  fontWeight: '400',
                                  border:
                                    colorSelected === item
                                      ? '2px solid #2F4F4F'
                                      : '1px solid #2F4F4F',
                                  borderRadius: '0.3rem',
                                  marginRight: '5px',
                                  color: '#2F4F4F',
                                }}
                                onClick={() => setColorSelected(item)}
                              >
                                {color.name}
                              </MDButton>
                            );
                          }
                        }
                      })
                    : null}
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <MDTypography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '500',
                      color: '#B00E18',
                      marginRight: '5px',
                    }}
                    textTransform="capitalize"
                  >
                    {productSelected.salePrice
                      ? `${formatThousand(
                          Number(productSelected?.salePrice) * amount
                        )}đ *`
                      : null}
                  </MDTypography>
                  <span
                    style={{
                      marginLeft: '3px',
                      fontSize: '1rem',
                      fontWeight: '400',
                      color: '#696969',
                      textDecoration: 'line-through',
                    }}
                  >
                    {productSelected.regularPrice
                      ? `${formatThousand(
                          Number(productSelected?.regularPrice) * amount
                        )}đ`
                      : null}
                  </span>
                  <span
                    style={{
                      marginLeft: '3px',
                      fontSize: '1rem',
                      fontWeight: '400',
                      color: '#B00E18',
                    }}
                  >
                    {productSelected.sale !== '0'
                      ? `-${productSelected.sale}%`
                      : null}
                  </span>
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <MDButton
                    variant="outlined"
                    color="dark"
                    sx={{
                      minWidth: '20px',
                      minHeight: '20px',
                      borderRadius: '0.3rem',
                      border: '1px solid #2F4F4F',
                      marginRight: '5px',
                      padding: '3px 3px',
                      color: '#2F4F4F',
                    }}
                    onClick={() => {
                      if (amount > 1) {
                        setAmount(amount - 1);
                      } else {
                        return;
                      }
                    }}
                  >
                    <RemoveIcon
                      sx={{
                        color: '#111111',
                      }}
                    />
                  </MDButton>
                  <MDTypography
                    sx={{
                      maxWidth: '50px',
                      minWidth: '20px',
                      minHeight: '15px',
                      borderRadius: '0.3rem',
                      padding: '1px 1px',
                      color: '#2F4F4F',
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '400',
                    }}
                    variant="outlined"
                    size="small"
                  >
                    {amount}
                  </MDTypography>
                  <MDButton
                    variant="outlined"
                    color="dark"
                    sx={{
                      minWidth: '20px',
                      minHeight: '20px',
                      borderRadius: '0.3rem',
                      marginLeft: '5px',
                      padding: '3px 3px',
                      color: '#2F4F4F',
                    }}
                    onClick={() => setAmount(amount + 1)}
                  >
                    <AddIcon
                      sx={{
                        color: '#111111',
                      }}
                    />
                  </MDButton>
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <MDButton
                    variant="contained"
                    color="info"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      padding: '2px 10px',
                      marginRight: '5px',
                    }}
                    onClick={handleAddItemToCart}
                  >
                    <ShoppingCartCheckoutIcon size="large" color="white" />
                    &nbsp; Thêm vào giỏ hàng
                  </MDButton>
                  <MDButton
                    variant="contained"
                    color="success"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      padding: '2px 10px',
                      marginRight: '5px',
                    }}
                  >
                    <ShoppingCartCheckoutIcon size="large" color="white" />
                    &nbsp; Mua ngay
                  </MDButton>
                </MDBox>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </MDBox>
  );
};

export default SingleProduct;
