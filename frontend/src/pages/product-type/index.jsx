/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useCallback, useMemo } from 'react';

import {
  Container,
  Stack,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { notification } from 'antd';
import _ from 'lodash';
import Breadcrumbs from '../../components/CustomBreadcrumbs';
import MDBox from '../../components/MDBox';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import { formatThousand } from '../../utils/custom-price';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './style.css';
import userThunk from '../../features/user/user.service';
import { selectIsLoggedIn } from '../../features/user/user.slice';
import cartThunk from '../../features/cart/cart.service';
import DetailProductItem from './detai-item';
import ReviewComponent from './review.jsx';
import Slider from 'react-slick';

const colorList = [
  { name: 'Red', value: 'Red' },
  { name: 'Orange', value: 'Orange' },
  { name: 'Yellow', value: 'Yellow' },
  { name: 'Green', value: 'Green' },
  { name: 'Blue', value: 'Blue' },
  { name: 'Purple', value: 'Purple' },
  { name: 'Pink', value: 'Pink' },
  { name: 'Brown', value: 'Brown' },
  { name: 'Gray', value: 'Gray' },
  { name: 'Black', value: 'Black' },
  { name: 'White', value: 'White' },
];
const listTitle = [
  'Screen',
  'Operating system',
  'Rear camera',
  'Front camera',
  'Chips',
  'RAM',
  'Storage capacity',
  'SIM',
  'Rechargeable batteries',
];
function getOptions(products) {
  let option = products.reduce((acc, curr) => {
    const option = `${curr.ram}-${curr.storage}`;
    if (!acc.includes(option)) {
      acc.push(option);
    }
    return acc;
  }, []);

  const uniqueRam = products.reduce((acc, curr) => {
    if (!acc.includes(curr.ram)) {
      acc.push(curr.ram);
    }
    return acc;
  }, []);

  const option2 = products.map((product) => product.storage);

  if (uniqueRam.length === 1) {
    option = option2.filter((item, index) => option2.indexOf(item) === index);
  }

  option = option.filter((item, index) => option.indexOf(item) === index);

  return option;
}
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
};
const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const data = useSelector((state) => state.data);

  // const { products } = data;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { categorySlug } = useParams();
  const ram = queryParams.get('ram');
  const storage = queryParams.get('storage');
  const categoryOneName = categorySlug.split('-')[0];
  const [dataProducts, setDataProducts] = useState([]);
  const [dataOption, setDataOption] = useState([]);
  const [productList, setProductList] = useState([]);
  const [ramSelected, setRamSelected] = useState(ram);
  const [storageSelected, setStorageSelected] = useState(storage);
  const [options, setOptions] = useState([]);
  const [optionIndex, setOptionIndex] = useState(0);
  const [colorSelected, setColorSelected] = useState('');
  const [colorIndex, setColorIndex] = useState(-1);
  const [colorListProduct, setColorListProduct] = useState([]);
  const [productSelected, setProductSelected] = useState(null);
  const [amount, setAmount] = useState(1);
  const [productPictureIndex, setProductPictureIndex] = useState(0);
  // select state
  const [productImages, setProductImages] = useState([]);
  // TODO description
  const [openDescription, setOpenDescription] = React.useState(false);

  const handleClose = () => {
    setOpenDescription(false);
  };
  const handleToggle = () => {
    setOpenDescription(!openDescription);
  };

  const handleClickImage = (id, e) => {
    e.preventDefault();
    setProductPictureIndex(id);
  };
  const onChangeInput = (event) => {
    const inputValue = event.target.value;
    if (inputValue === '' || inputValue <= 0) {
      setAmount(1);
    } else {
      setAmount(inputValue);
    }
  };
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
            message: 'Product added to cart!',
            placement: 'top',
          });
          dispatch(cartThunk.getAllItemsAPI());
        })
        .catch(() => {
          notification.error({
            message: 'Product exceeds quantity in stock!',
            placement: 'top',
          });
        });
    } else {
      navigate('/sign-in');
    }
  };
  const handleColorClick = useCallback(
    (item) => {
      setColorSelected(item);
      const indexColor = colorList.findIndex((data) => data === item);
      setColorIndex(indexColor);
      const filteredProducts = _.find(productList, (product) => {
        return (
          product.color === item &&
          product.ram === ramSelected &&
          product.storage === storageSelected
        );
      });
      setProductSelected(filteredProducts);
      const productImage = filteredProducts.productPictures.filter(
        (item, index) => index !== 0
      );
      setProductImages(productImage);
      // Cập nhật URL với RAM, Storage và Color mới
      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set('ram', ramSelected);
      urlSearchParams.set('storage', storageSelected);
      const newUrl = `${window.location.origin}${
        window.location.pathname
      }?${urlSearchParams.toString()}`;
      window.history.replaceState(null, null, newUrl);
    },
    [ramSelected, storageSelected, productList]
  );
  const handleOptionClick = useCallback(
    (index) => {
      setOptionIndex(index);
      const { ram, storage } = dataOption[index];
      setRamSelected(ram);
      setStorageSelected(storage);
      console.log(index, ram, storage);
      console.log('data product', dataProducts);
      dataProducts.map((item, index) => {
        if (item._id.ram === ram && item._id.storage === storage) {
          setColorListProduct(item.colors);
          setProductList(item.items);
          let indexColor = -1;
          const colorIndexExits = item.colors.indexOf(colorSelected);
          if (colorIndexExits === -1) {
            indexColor = 0;
          } else {
            indexColor = colorIndex;
          }

          setColorSelected(item.colors[indexColor]);
          setProductSelected(item.items[indexColor]);
          const productImage = item.items[indexColor].productPictures.filter(
            (item, index) => index !== 0
          );
          setProductImages(productImage);
          setColorIndex(indexColor);
        }
      });
    },
    [dataOption, colorIndex, colorSelected, dataProducts]
  );
  useEffect(() => {
    // initial data
    dispatch(userThunk.getProductAPI(categorySlug))
      .unwrap()
      .then((value) => {
        console.log(value);
        const { products } = value;
        setDataProducts(products);
        const options = products.map((item) => item._id);
        setDataOption(options);
        const optionsCustom = getOptions(options);
        console.log(optionsCustom);
        setOptions(optionsCustom);
        let result = -1;

        products.map((item, index) => {
          if (item._id.ram === ram && item._id.storage === storage) {
            console.log(item);
            setColorListProduct(item.colors);
            setProductList(item.items);
            setProductSelected(item.items[0]);

            const productImage = item.items[0].productPictures.filter(
              (item, index) => index !== 0
            );
            setProductImages(productImage);
            result = index;
            setColorIndex(0);
            setColorSelected(item.colors[0]);
          }
        });
        setOptionIndex(result);
      });
  }, [dispatch, categorySlug, ram, storage]);

  return (
    <MDBox
      color="#000000"
      bgColor="#fff"
      variant="contained"
      borderRadius="none"
      opacity={1}
      paddingTop="10px"
      display="flex"
      justifyContent="space-between"
      minHeight="80vh"
      width="100%"
    >
      <Container>
        {productSelected ? (
          <>
            <Paper
              elevation={3}
              sx={{
                margin: '10px 0px',
                padding: '0px 9.75px',
                borderRadius: '8px',
                boxShadow: '#dbd9d9 5px 5px 5px 5px',
                color: '#808191',
              }}
            >
              <Grid
                container
                xs={12}
                item
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ paddingLeft: '10px' }}
              >
                {' '}
                <Breadcrumbs title={`Phone`} />
              </Grid>
            </Paper>
            <MDBox variant="contained">
              <Paper
                elevation={3}
                sx={{
                  padding: '16px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  boxShadow: '#dbd9d9 5px 5px 5px 5px',
                  color: '#808191',
                }}
              >
                <Grid>
                  <MDTypography
                    sx={{
                      paddingRight: '10px',
                      color: '#323232',
                      fontWeight: '700',
                      fontSize: '16.25px',
                      marginBottom: '20px',
                    }}
                  >
                    {`${productSelected.name} ${ramSelected}`}
                  </MDTypography>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  item
                  xs={12}
                  sx={{ padding: '10px' }}
                >
                  {/* Hình ảnh sản phẩm và mô tả */}
                  <Grid
                    item
                    container
                    xs={7}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <MDBox variant="contained" sx={{ marginRight: '10px' }}>
                        <div className="product__detail-content">
                          <div className="product__detail-wrap-img">
                            <img
                              src={productImages[productPictureIndex]}
                              alt={productSelected.name}
                              className="detail__img-big"
                            />
                          </div>
                          <div className="product__detail-list-img">
                            {productImages.map((item, index) => (
                              <div
                                className="detail__list-img-small"
                                key={index}
                              >
                                <a href="" className="link__detail-img-small">
                                  <img
                                    onClick={(e) => handleClickImage(index, e)}
                                    src={item}
                                    className="detail__img-small"
                                    alt="tiep"
                                  />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </MDBox>
                      <MDTypography
                        sx={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#111',
                        }}
                      >
                        Product information
                      </MDTypography>
                      <MDBox variant="contained">
                        {productSelected ? (
                          <div
                            className="content maxHeight gradient"
                            dangerouslySetInnerHTML={{
                              __html: productSelected.description.slice(
                                0,
                                1000
                              ),
                            }}
                          />
                        ) : null}
                        <Stack
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ marginBottom: '20px' }}
                        >
                          <MDBox display="flex" justifyContent="center">
                            <MDButton
                              size="medium"
                              color="dark"
                              variant="outlined"
                              sx={{
                                textTransform: 'initial !important',
                                fontWeight: '500',
                                width: '300px',
                                textAlign: 'center',
                              }}
                              onClick={handleToggle}
                            >
                              Show more
                            </MDButton>
                          </MDBox>

                          <Dialog
                            maxWidth="xl"
                            open={openDescription}
                            onClick={handleClose}
                          >
                            <DialogTitle fullWidth={true}>
                              Product information
                            </DialogTitle>
                            {productSelected ? (
                              <div
                                style={{
                                  padding: '24px',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: productSelected.description,
                                }}
                              />
                            ) : null}
                          </Dialog>
                        </Stack>
                      </MDBox>
                      <ReviewComponent product={productSelected} />
                    </Stack>
                  </Grid>
                  {/* thông tin sản phẩm */}
                  <Grid
                    sx={{ paddingLeft: '30px' }}
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
                        {options
                          ? options.map((item, index) => {
                              return (
                                <MDButton
                                  key={index}
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    padding: '2px 3px',
                                    border:
                                      optionIndex === index
                                        ? '1px solid #a6b3f6'
                                        : '',
                                    borderRadius: '8px',
                                    marginRight: '3px',
                                    marginBottom: '3px',
                                    width: '30px',
                                    color: '#4d69fa',
                                    backgroundColor: '#edf0ff',
                                    textTransform: 'initial !important',
                                    boxShadow: '#dbd9d9 5px 5px 5px 5px',
                                  }}
                                  color="light"
                                  onClick={() => handleOptionClick(index)}
                                >
                                  {item}
                                </MDButton>
                              );
                            })
                          : null}
                      </MDBox>
                      <MDBox variant="contained">
                        {colorListProduct
                          ? colorListProduct.map((item, index) => {
                              for (let color of colorList) {
                                if (color.value === item) {
                                  return (
                                    <MDButton
                                      key={index}
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        padding: '2px 3px',
                                        border:
                                          colorIndex === index
                                            ? '1px solid #9fe2d8'
                                            : '',
                                        marginRight: '3px',
                                        marginBottom: '3px',
                                        width: '30px',
                                        color: '#46bcaa',
                                        backgroundColor: '#edf8f7',
                                        textTransform: 'initial !important',
                                        borderRadius: '8px',
                                        boxShadow: '#dbd9d9 5px 5px 5px 5px',
                                      }}
                                      color="light"
                                      onClick={() => handleColorClick(item)}
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
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#323232',
                          }}
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
                            fontSize: '14px',
                            fontWeight: '500',
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
                            fontWeight: '500',
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
                        <span
                          style={{
                            marginLeft: '3px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#323232',
                          }}
                        >
                          {productSelected.stock && productSelected.stock > 0
                            ? `${productSelected.stock} products`
                            : 'Out of stock'}
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
                            borderRadius: '8px',
                            border: '1px solid #e7eef8',
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
                        <TextField
                          type="text"
                          value={amount}
                          onChange={onChangeInput}
                          InputProps={{
                            inputProps: {
                              min: 1,
                            },
                            sx: {
                              maxWidth: '50px',
                              maxHeight: '24px',
                              minWidth: '35px',
                              borderRadius: '8px',
                              padding: '1px 1px',
                              border: '1px solid #e7eef8',
                              color: '#2F4F4F',
                              textAlign: 'center',
                              fontSize: '14px',
                              fontWeight: '600',
                            },
                          }}
                        />
                        <MDButton
                          variant="outlined"
                          color="dark"
                          sx={{
                            minWidth: '20px',
                            minHeight: '20px',
                            borderRadius: '8px',
                            marginLeft: '5px',
                            border: '1px solid #e7eef8',
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
                          onClick={handleAddItemToCart}
                        >
                          <ShoppingCartCheckoutIcon
                            size="large"
                            sx={{
                              color: '#46bcaa',
                            }}
                          />
                          &nbsp; Add to cart
                        </MDButton>
                      </MDBox>
                    </Stack>
                    <MDTypography
                      sx={{
                        color: '#111111',
                        marginBottom: '16px',
                        marginTop: '16px',
                        fontWeight: '600',
                      }}
                    >
                      Digital {productSelected.name}
                    </MDTypography>
                    <MDBox maxWidth="460px" variant="contained">
                      <Paper
                        elevation={1}
                        sx={{
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0',
                          boxShadow: '#dbd9d9 5px 5px 5px 5px',
                          padding: '10px',
                        }}
                      >
                        {productSelected
                          ? Object.entries(productSelected.detailsProduct).map(
                              (item, index) => {
                                return (
                                  <DetailProductItem
                                    key={index}
                                    value={item[1]}
                                    title={listTitle[index]}
                                    color={
                                      index % 2 === 0 ? '#f5f5f5' : '#ffffff'
                                    }
                                  />
                                );
                              }
                            )
                          : null}
                      </Paper>
                    </MDBox>
                  </Grid>
                </Grid>
              </Paper>
            </MDBox>

            <MDBox sx={{ marginTop: '10px', marginBottom: '10px' }}>
              <MDTypography
                sx={{
                  fontWeight: '700',
                  fontSize: '20px',
                  color: '#111',
                  margin: '15px 0px',
                }}
              >
                See more phones
              </MDTypography>
              <Slider {...settings}>
                {/* {products.length > 0
                  ? products.map((item, index) => {
                      if (index < 6) {
                        return (
                          <Item key={index}>
                            <ProductCard
                              category={item.category}
                              products={item.products}
                            />
                          </Item>
                        );
                      }
                    })
                  : null} */}
              </Slider>
            </MDBox>
          </>
        ) : (
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </MDBox>
  );
};

export default ProductPage;
