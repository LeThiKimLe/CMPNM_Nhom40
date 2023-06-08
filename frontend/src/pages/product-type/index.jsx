/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useCallback, useMemo } from 'react';

import {
  Container,
  Stack,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { notification } from 'antd';
import _ from 'lodash';
import Breadcrumbs from '../../components/CustomBreadcrumbs';
import MDBox from '../../components/MDBox';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import { formatThousand } from '../../utils/custom-price';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './style.css';
import { cartActions, selectCartItems } from '../../features/cart/cart.slice';
import userThunk from '../../features/user/user.service';
import { selectIsLoggedIn } from '../../features/user/user.slice';
import cartThunk from '../../features/cart/cart.service';
import DetailProductItem from './detai-item';
import ReviewComponent from './review.jsx';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <MDBox
      shadow="lg"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,
        marginRight: '8px',
        fontSize: '0.875rem',
        fontWeight: '700',
        maxWidth: '250px',
        minWidth: '240px',
        marginBottom: '8px',
        minHeight: '495px',
        borderRadius: '16px',
        paddingTop: '16px',
        ...sx,
      }}
      {...other}
    />
  );
}
const listTitle = [
  'Màn hình',
  'Hệ điều hành',
  'Camera sau',
  'Camera trước',
  'Chip',
  'RAM',
  'Dung lượng lưu trữ',
  'SIM',
  'Pin, Sạc',
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
const ProductPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const { colors } = data;

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
  const [loading, setLoading] = useState(true);
  const [colorSelected, setColorSelected] = useState('');
  const [colorIndex, setColorIndex] = useState(-1);
  const [colorList, setColorList] = useState([]);
  const [colorCategory, setColorCategory] = useState([]);
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
  const handleColorClick = useCallback(
    (item) => {
      setColorSelected(item);
      const indexColor = colorList.findIndex((data) => data === item);
      setColorIndex(indexColor);
      const filteredProducts = _.find(productList, (product) => {
        return (
          product.color === item &&
          product.detailsProduct.ram === ramSelected &&
          product.detailsProduct.storage === storageSelected
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
    [ramSelected, storageSelected, colorList, productList]
  );
  const handleOptionClick = useCallback(
    (index) => {
      console.log(dataOption, options);
      setOptionIndex(index);
      const { ram, storage } = dataOption[index];
      setRamSelected(ram);
      setStorageSelected(storage);

      dataProducts.map((item, index) => {
        if (item._id.ram === ram && item._id.storage === storage) {
          setColorList(item.colors);
          setProductList(item.products);
          let indexColor = -1;
          const colorIndexExits = item.colors.indexOf(colorSelected);
          if (colorIndexExits === -1) {
            indexColor = 0;
          } else {
            indexColor = colorIndex;
          }

          setColorSelected(item.colors[indexColor]);
          setProductSelected(item.products[indexColor]);
          const productImage = item.products[indexColor].productPictures.filter(
            (item, index) => index !== 0
          );
          setProductImages(productImage);
          setColorIndex(indexColor);
        }
      });
    },
    [dataOption, options, colorIndex, colorSelected, dataProducts]
  );
  useEffect(() => {
    // initial data
    dispatch(userThunk.getProductAPI(categorySlug))
      .unwrap()
      .then((value) => {
        const { listColor, products } = value.list;
        setColorCategory(listColor[0].colors);
        setDataProducts(products);
        const options = products.map((item) => item._id);
        setDataOption(options);
        const optionsCustom = getOptions(options);
        console.log(optionsCustom);
        setOptions(optionsCustom);
        let result = -1;
        products.map((item, index) => {
          if (item._id.ram === ram && item._id.storage === storage) {
            setColorList(item.colors);
            setProductList(item.products);
            setProductSelected(item.products[0]);

            const productImage = item.products[0].productPictures.filter(
              (item, index) => index !== 0
            );
            setProductImages(productImage);
            result = index;
            setColorIndex(0);
            setColorSelected(item.colors[0]);
          }
        });
        setOptionIndex(result);
        setLoading(false);
      });
  }, [dispatch, categorySlug, ram, storage, colors]);

  return (
    <MDBox
      color="#000000"
      bgColor="Light"
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
        {!loading && productSelected ? (
          <>
            <Grid container justifyContent="flex-start" alignItems="flex-start">
              <Breadcrumbs
                title={`Điện thoại ${categoryOneName.toUpperCase()}`}
              />
            </Grid>
            <Grid>
              <MDTypography sx={{ color: '#111111' }}>
                {`${productSelected.name} ${ramSelected}`}
              </MDTypography>
            </Grid>
            <Divider flexItem />
            <Grid
              container
              spacing={2}
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              item
              xs={12}
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
                          <div className="detail__list-img-small" key={index}>
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
                    Thông tin sản phẩm
                  </MDTypography>
                  <MDBox variant="contained">
                    {productSelected ? (
                      <div
                        className="content maxHeight gradient"
                        dangerouslySetInnerHTML={{
                          __html: productSelected.description.slice(0, 1000),
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
                          Xem thêm
                        </MDButton>
                      </MDBox>

                      <Dialog
                        maxWidth="xl"
                        open={openDescription}
                        onClick={handleClose}
                      >
                        <DialogTitle fullScreen={true} fullWidth={true}>
                          Thông tin sản phẩm
                        </DialogTitle>
                        {productSelected ? (
                          <div
                            style={{ padding: '24px' }}
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
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                padding: '2px 10px',
                                border:
                                  optionIndex === index
                                    ? '2px solid #2F4F4F'
                                    : '',
                                borderRadius: '0.3rem',
                                marginRight: '5px',
                              }}
                              onClick={() => handleOptionClick(index)}
                            >
                              {item}
                            </MDButton>
                          );
                        })
                      : null}
                  </MDBox>
                  <MDBox variant="contained">
                    {colorList
                      ? colorList.map((item, index) => {
                          for (let color of colorCategory) {
                            if (color.value === item) {
                              return (
                                <MDButton
                                  key={index}
                                  variant="contained"
                                  size="small"
                                  shadow="lg"
                                  sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    border:
                                      colorSelected === item
                                        ? '2px solid #2F4F4F'
                                        : '',
                                    borderRadius: '0.3rem',
                                    marginRight: '5px',
                                    marginBottom: '10px',
                                  }}
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
                    <span
                      style={{
                        marginLeft: '3px',
                        fontSize: '1rem',
                        fontWeight: '400',
                      }}
                    >
                      {productSelected.stock && productSelected.stock > 0
                        ? 'Còn hàng'
                        : 'Hết hàng'}
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
                <MDTypography
                  sx={{
                    color: '#111111',
                    marginBottom: '16px',
                    marginTop: '16px',
                  }}
                >
                  Cấu hình {productSelected.name}
                </MDTypography>
                <MDBox
                  variant="contained"
                  maxWidth="460px"
                  sx={{ border: '8px' }}
                >
                  {productSelected
                    ? Object.entries(productSelected.detailsProduct).map(
                        (item, index) => {
                          return (
                            <DetailProductItem
                              key={index}
                              value={item[1]}
                              title={listTitle[index]}
                              color={index % 2 === 0 ? '#f5f5f5' : '#ffffff'}
                            />
                          );
                        }
                      )
                    : null}
                </MDBox>
              </Grid>
            </Grid>

            <MDBox sx={{ marginTop: '10px', marginBottom: '10px' }}>
              <MDTypography
                sx={{
                  fontWeight: '700',
                  fontSize: '20px',
                  color: '#111',
                  margin: '15px 0px',
                }}
              >
                Xem thêm điện thoại khác
              </MDTypography>
            </MDBox>
            {/* Xem thêm điện thoại khác
            <div className="list-product-sample">
             
            </div> */}
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
