/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  Divider,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
} from '@mui/material';
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
import './style.css';
import { cartActions, selectCartItems } from '../../features/cart/cart.slice';
import { selectIsLoggedIn } from '../../features/user/user.slice';
import cartThunk from '../../features/cart/cart.service';
import DetailProductItem from './detail-item';

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
  const storages = location.state?.storages;
  const groupColors = location.state?.groupColors;
  const optionSelect = location.state?.optionSelected;
  const productGroup = location.state?.productGroup;

  const category = location.pathname.split('/')[2];
  // init state
  const [ramSelected, setRamSelected] = useState(ram);
  const [storageSelected, setStorageSelected] = useState(storage);
  const [optionSelected, setOptionSelected] = useState(optionSelect);
  const [colorSelected, setColorSelected] = useState(null);
  const [colorList, setColorList] = useState([]);
  const [amount, setAmount] = useState(1);
  const [productPictureIndex, setProductPictureIndex] = useState(0);
  // select state
  const [productImages, setProductImages] = useState([]);
  const [productSelected, setProductSelected] = useState(product);

  // TODO description
  const [openDescription, setOpenDescription] = React.useState(false);
  const handleClose = () => {
    setOpenDescription(false);
  };
  const handleToggle = () => {
    setOpenDescription(!openDescription);
  };

  //

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

  //* useEffect handle init page

  useEffect(() => {
    // setColorSelected(
    //   colorSelected
    //     ? colorSelected
    //     : colorGroup.`${ramSelected}-${storageSelected}`.[0]
    // );
    let ramSelect = '';
    let storageSelect = '';
    if (option.length === storages.length) {
      rams.map((item, index) => {
        setRamSelected(item);
        ramSelect = item;
      });
      storageSelect = storages[optionSelected];
      setStorageSelected(storages[optionSelected]);
    } else {
      option.map((item, index) => {
        if (index === optionSelected) {
          setRamSelected(item.split('-')[0]);
          setStorageSelected(item.split('-')[1]);
          ramSelect = item.split('-')[0];
          storageSelect = item.split('-')[1];
        }
      });
    }

    const colorList = groupColors[`${ramSelect}-${storageSelect}`];
    setColorList(colorList);

    if (!colorSelected || colorList.indexOf(colorSelected) === -1) {
      setColorSelected(colorList[0]);
    }
  }, [optionSelected, rams, option, storages, colorSelected, groupColors]);
  // handle option
  useEffect(() => {
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
        const productImage = item.productPictures.filter(
          (item, index) => index !== 0
        );
        setProductImages(productImage);
        setProductSelected(item);
        return;
      }
    });
  }, [colorSelected, ramSelected, storageSelected, productGroup]);
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
    >
      {productSelected ? (
        <Container>
          <Grid container justifyContent="flex-start" alignItems="flex-start">
            <Breadcrumbs title={`Điện thoại ${name}`} url={id} />
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
                <MDTypography sx={{ fontSize: '20px', color: '#111111' }}>
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
                    <MDButton onClick={handleToggle}>Xem thêm</MDButton>
                    <Dialog
                      fullWidth={'xl'}
                      maxWidth={'xl'}
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
                  {colorList
                    ? colorList.map((item, index) => {
                        for (let color of colors) {
                          if (
                            color.value === item &&
                            color.category === category
                          ) {
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
                                  marginBottom: '10px',
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
              <MDBox variant="contained" maxWidth="460px">
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
          <Grid
            container
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            Xem thêm điện thoại khác
          </Grid>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </MDBox>
  );
};

export default SingleProduct;
