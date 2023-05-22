/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Container,
  Paper,
  Divider,
  Stack,
  Chip,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Collapse,
  IconButton,
} from '@mui/material';
// *socket io
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MDButton from '../../components/MDButton';
import { formatThousand } from '../../utils/custom-price';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckOutItem from '../../components/CheckOutItem';
import getAddressAPI from '../../utils/get-details-address';
import ModalAddress from './modal-address';
import addressThunk from '../../features/address/address.service';
import {
  customListOrderProducts,
  customeListOrderProductsPaypal,
} from '../../utils/custom-products';
import orderThunk from '../../features/order/order.service';
import { cartActions } from '../../features/cart/cart.slice';
import ModalAddAddress from './modal-add-address';
const columns = [
  {
    key: 'name',
    fieldName: 'Sản phẩm',
    index: 'name',
    width: 4,
    justifyContent: 'flex-start',
  },
  {
    key: 'details',
    fieldName: '',
    index: 'details',
    width: 2.5,
    justifyContent: 'center',
  },
  {
    key: 'price',
    fieldName: 'Đơn giá',
    index: 'price',
    width: 2,
    justifyContent: 'center',
  },
  {
    key: 'quantity',
    fieldName: 'Số lượng',
    index: 'quantity',
    width: 1.5,
    justifyContent: 'center',
  },
  {
    key: 'totalPrice',
    fieldName: 'Số tiền',
    index: 'totalPrice',
    justifyContent: 'flex-end',
    width: 2,
  },
];
const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  marginTop: '2px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(57,75,89,.5)'
        : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function getTotalPrice(items) {
  let total = 0;
  items.map((item, index) => {
    const { salePrice, quantity } = item;
    const price = Number(salePrice) * quantity;
    total = total + price;
  });
  return total;
}

const CheckOutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const { colors } = data;
  const cart = useSelector((state) => state.cart);
  const addressUser = useSelector((state) => state.addressUser);
  const { cartItems } = cart;
  const [items, setItems] = useState(cartItems);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [listAddress, setListAddress] = useState(addressUser.addresses);
  const [addressIndexSelected, setAddressIndexSelected] = useState(
    getAddressAPI.getIndexDefault(addressUser.addresses)
  );
  const [addressSelected, setAddressSelected] = useState(
    getAddressAPI.getAddressDefault(addressUser.addresses, addressIndexSelected)
  );
  const [addressIndex, setAddressIndex] = useState(0);
  // * address handle
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [shipAmount, setShipAmount] = useState(0);
  const [methodShip, setMethodShip] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [freeShip, setFreeShip] = useState(0);

  // modal change payment
  const [paymentType, setPaymentType] = React.useState(0);
  //* modal add new Address
  const [openModalAdd, setOpenModalAdd] = useState(false);

  // * SET OPEN SELECT METHOD PAYMENT
  const [expanded, setExpanded] = React.useState(false);
  const [selectPayment, setSelectPayment] = useState(paymentType);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setSelectPayment(paymentType);
  };
  const handleSelectMethod = (event) => {
    const num = parseInt(event.target.value);
    setSelectPayment(num);
  };
  const handleSelectedMethod = () => {
    setExpanded(!expanded);
    setPaymentType(selectPayment);
  };
  // * SET OPEN SELECT METHOD PAYMENT

  const onCancelModalAdd = () => {
    setOpenModalAdd(false);
  };

  const getMethodShip = async (to_district) => {
    const response = await fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=3076334&from_district=1442&to_district=${to_district}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: 'cors',
          Host: 'api.producthunt.com',
          token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
        },
      }
    ).then((response) => response.json());

    // update the state
    if (response.code === 200) {
      return response.data[0].service_id;
    }
  };
  const getShipOrder = async (totalAmount, value, address, number = 1) => {
    const response = await fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${value}&insurance_value=${totalAmount}&to_ward_code=${
        address.wardCode
      }&to_district_id=${address.districtId}&from_district_id=1442&weight=${
        200 * number
      }&length=50&width=50&height=7&to_district=${value}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: 'cors',
          Host: 'api.producthunt.com',
          token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
          shop_id: '3076334',
        },
      }
    ).then((response) => response.json());

    // update the state
    if (response.code === 200) {
      return response.data.total;
    }
  };
  const handleCancel = () => {
    setOpenModalAddress(false);
    setAddressIndex(addressIndexSelected);
  };
  const handleChangeAddress = () => {
    if (addressIndexSelected === addressIndex) {
      return;
    } else {
      setAddressIndexSelected(addressIndex);
    }
    setOpenModalAddress(false);
  };
  const handleOrder = () => {
    setCheckoutLoading(true);
    if (Object.keys(addressSelected).length === 0) {
      setTimeout(() => {
        notification.error({ message: 'Vui lòng chọn địa chỉ giao hàng!' });
        setCheckoutLoading(false);
      }, 1500);
      return;
    } else {
      let orderCod = {
        addressId: addressSelected._id,
        totalAmount,
        shipAmount,
        freeShip,
        subTotal: getTotalPrice(items),
      };
      orderCod.items = customListOrderProducts(items);
      localStorage.setItem('orderCodMomo', JSON.stringify(orderCod));
      if (paymentType === 0) {
        dispatch(orderThunk.addOrderAPI(orderCod))
          .unwrap()
          .then((value) => {
            setTimeout(() => {
              notification.success({ message: 'Đặt hàng thành công!' });
              setCheckoutLoading(false);
              // navigation order-confirmation
              dispatch(cartActions.reset());

              navigate('/order-confirmation', {
                state: { id: value.order._id },
              });
            }, 1500);
          });
      } else if (paymentType === 1) {
        let orderData = {
          address: addressSelected,
          totalAmount,
          shipAmount,
          freeShip,
          subTotal: getTotalPrice(items),
        };
        orderData.items = customeListOrderProductsPaypal(items, colors);
        console.log('payment with paypal');
        dispatch(orderThunk.paymentWithPaypal(orderData))
          .unwrap()
          .then((value) => {
            // value have url thanh toan
            console.log(value.payment);
            const { transactions } = value.payment;
            let data = transactions[0];
            data.addressId = addressSelected._id;
            localStorage.setItem('orderPaypal', JSON.stringify(data));
            const { links } = value.payment;
            const url = links[1].href;
            window.open(url, '_blank');
            setCheckoutLoading(false);
          })
          .catch(() => {
            localStorage.removeItem('orderPaypal');
          });
        // checkout with paypal
      } else {
        // * payment with momo
        // data order

        dispatch(orderThunk.paymentWithMomo({ totalAmount }))
          .unwrap()
          .then((value) => {
            // value have url thanh toan
            console.log('payment with Momo');
            window.open(value, '_blank');
            setCheckoutLoading(false);
          })
          .catch(() => {});
      }
    }
  };
  useEffect(() => {
    setItems(cartItems);
    dispatch(addressThunk.getAllAPI())
      .unwrap()
      .then((data) => {
        if (data.length === 0) {
          setListAddress([]);
        } else {
          setListAddress(data.addresses);
          setAddressIndexSelected(
            getAddressAPI.getIndexDefault(data.addresses)
          );
          setAddressIndex(getAddressAPI.getIndexDefault(data.addresses));
        }
      });
  }, [cartItems, dispatch]);
  useEffect(() => {
    const address = getAddressAPI.getAddressDefault(
      addressUser.addresses,
      addressIndexSelected
    );
    if (Object.keys(address).length !== 0) {
      getMethodShip(address.districtId).then((value) => {
        setMethodShip(value);
      });
      setAddressSelected(address);
    }
  }, [addressIndexSelected, addressUser.addresses]);
  useEffect(() => {
    if (methodShip) {
      if (items.length > 0) {
        const totalPrice = getTotalPrice(items);
        let freeShip = 0;
        if (totalPrice >= 5000000) {
          freeShip = 100;
        } else if (3000000 <= totalPrice < 5000000) {
          freeShip = 70;
        } else {
          freeShip = 30;
        }
        getShipOrder(
          totalPrice,
          methodShip,
          addressSelected,
          items.length
        ).then((value) => {
          setShipAmount(value);
          const freeShipPrice = ~~((value * freeShip) / 100);
          setFreeShip(freeShipPrice);
          setTotalAmount(value + totalPrice - freeShipPrice);
        });
      }
    }
  }, [addressSelected, items, methodShip, freeShip]);

  return (
    <>
      <MDBox
        color="#000000"
        bgColor="Light"
        variant="contained"
        borderRadius="none"
        opacity={1}
        p={1}
        display="flex"
        justifyContent="flex-start"
        width="100%"
        minHeight="75vh"
      >
        <ModalAddAddress
          open={openModalAdd}
          setOpen={setOpenModalAdd}
          onCancel={onCancelModalAdd}
          setListAddress={setListAddress}
        />
        <ModalAddress
          open={openModalAddress}
          onCancel={handleCancel}
          onHandleCancel={handleCancel}
          addressIndexSelected={addressIndexSelected}
          listAddress={listAddress}
          handleChangeAddress={handleChangeAddress}
          addressIndex={addressIndex}
          setAddressIndex={setAddressIndex}
          setListAddress={setListAddress}
        />

        <Container>
          <Grid
            container
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ paddingTop: '15px' }}
          >
            <Grid
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
            >
              <MDBox variant="contained">
                <Paper elevation={3} sx={{ padding: '15px' }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {' '}
                    <Stack
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <LocationOnIcon color="primary" />
                        <MDTypography
                          color="primary"
                          sx={{
                            fontSize: '14px',
                            fontWeight: '700',
                          }}
                        >
                          Địa chỉ nhận hàng
                        </MDTypography>
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        {addressUser.getLoading ? (
                          <MDBox
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            p={2}
                          >
                            <CircularProgress />
                          </MDBox>
                        ) : (
                          <>
                            {listAddress.length === 0 ? (
                              <MDTypography
                                color="dark"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: '500',
                                }}
                              >
                                Chưa có địa chỉ
                              </MDTypography>
                            ) : (
                              <>
                                {Object.keys(addressSelected).length === 0 ? (
                                  <MDTypography
                                    color="dark"
                                    sx={{
                                      fontSize: '14px',
                                      fontWeight: '500',
                                    }}
                                  >
                                    Vui lòng chọn địa chỉ
                                  </MDTypography>
                                ) : (
                                  <>
                                    <MDTypography
                                      color="dark"
                                      sx={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                      }}
                                    >
                                      {`${addressSelected.name} | ${addressSelected.mobileNumber}`}
                                    </MDTypography>
                                    <MDTypography
                                      color="dark"
                                      sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                      }}
                                    >
                                      {`${addressSelected.address}, ${addressSelected.wardName}, ${addressSelected.districtName}, ${addressSelected.provinceName}`}
                                    </MDTypography>
                                    {addressSelected.isDefault ? (
                                      <Chip
                                        size="small"
                                        label="Mặc định"
                                        color="primary"
                                      />
                                    ) : null}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Stack>
                    </Stack>
                    <Stack
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={2}
                    >
                      {listAddress.length === 0 ? (
                        <MDButton
                          size="small"
                          color="dark"
                          variant="outlined"
                          sx={{
                            textTransform: 'initial !important',
                            fontWeight: '500',
                          }}
                          onClick={() => setOpenModalAdd(true)}
                        >
                          <EditIcon sx={{ marginRight: '4px' }} />
                          Thêm địa chỉ mới
                        </MDButton>
                      ) : (
                        <MDButton
                          size="small"
                          color="dark"
                          sx={{
                            textTransform: 'initial !important',
                            fontWeight: '500',
                          }}
                          onClick={() => setOpenModalAddress(true)}
                        >
                          <EditIcon sx={{ marginRight: '4px' }} />
                          Thay đổi
                        </MDButton>
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              </MDBox>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ marginTop: '10px' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12}>
              <MDBox variant="contained">
                <Paper elevation={3} sx={{ padding: '15px' }}>
                  <Grid
                    container
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    sx={{ marginBottom: '20px' }}
                  >
                    {columns.map((item) => {
                      return (
                        <Grid xs={item.width} key={item.index}>
                          {' '}
                          <MDTypography
                            color="primary"
                            sx={{
                              fontSize: '0.875rem',
                              fontWeight: '700',
                            }}
                          >
                            {item.fieldName}
                          </MDTypography>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Divider />
                  {cart.getLoading ? (
                    <MDBox
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                    >
                      <CircularProgress />
                    </MDBox>
                  ) : (
                    items.map((item, index) => {
                      return (
                        <div key={index}>
                          <CheckOutItem keyIndex={item?._id} product={item} />
                          <Divider />
                        </div>
                      );
                    })
                  )}
                </Paper>
              </MDBox>
            </Grid>
          </Grid>
          <Grid
            container
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ paddingTop: '15px' }}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              justifyContent="flex-start"
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
                      color="primary"
                      sx={{ fontSize: '14px' }}
                      variant="h4"
                    >
                      Phương thức thanh toán
                    </MDTypography>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems={'center'}
                      spacing={2}
                    >
                      <MDTypography
                        color="dark"
                        sx={{ fontSize: '14px' }}
                        variant="h4"
                      >
                        {paymentType === 0
                          ? 'Thanh toán khi nhận hàng'
                          : paymentType === 1
                          ? 'Thanh toán qua ví Paypal'
                          : 'Thanh toán qua ví Momo'}
                      </MDTypography>

                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </Stack>
                  </Stack>
                  <Stack justifyContent="center" direction="column">
                    <Collapse
                      in={expanded}
                      timeout="auto"
                      unmountOnExit
                      sx={{ marginBottom: '15px' }}
                    >
                      <FormControl>
                        <RadioGroup
                          value={selectPayment}
                          defaultValue={paymentType}
                          aria-labelledby="demo-customized-radios"
                          name="customized-radios"
                          onChange={handleSelectMethod}
                        >
                          <FormControlLabel
                            value={0}
                            control={<BpRadio />}
                            label={
                              <MDTypography
                                sx={{
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color: '#344767',
                                }}
                              >
                                Thanh toán khi nhận hàng
                              </MDTypography>
                            }
                          />
                          <FormControlLabel
                            value={1}
                            control={<BpRadio />}
                            label={
                              <MDTypography
                                sx={{
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color: '#344767',
                                }}
                              >
                                Thanh toán qua ví Paypal
                              </MDTypography>
                            }
                          />
                          <FormControlLabel
                            value={2}
                            control={<BpRadio />}
                            label={
                              <MDTypography
                                sx={{
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color: '#344767',
                                }}
                              >
                                Thanh toán qua ví Momo
                              </MDTypography>
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                      <Stack
                        alignItems="flex-end"
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                      >
                        <MDButton
                          size="small"
                          color="success"
                          sx={{
                            textTransform: 'initial !important',
                            fontWeight: '500',
                          }}
                          onClick={handleSelectedMethod}
                        >
                          Xác nhận
                        </MDButton>
                        <MDButton
                          size="small"
                          color="primary"
                          sx={{
                            textTransform: 'initial !important',
                            fontWeight: '500',
                          }}
                          onClick={handleExpandClick}
                        >
                          Hủy
                        </MDButton>
                      </Stack>
                    </Collapse>
                  </Stack>
                  {items && items.length > 0 ? (
                    <>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{ marginTop: '10px' }}
                      >
                        <MDTypography
                          color="primary"
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
                        sx={{ marginBottom: '5px' }}
                      >
                        <MDTypography
                          color="dark"
                          sx={{ fontSize: '14px', fontWeight: '500' }}
                          variant="body"
                        >
                          Tổng tiền hàng:
                        </MDTypography>
                        <MDTypography
                          color="dark"
                          sx={{ fontSize: '14px', fontWeight: '500' }}
                        >
                          {formatThousand(getTotalPrice(items))}đ
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
                          sx={{ fontSize: '14px', fontWeight: '500' }}
                          variant="body"
                        >
                          Tổng phí vận chuyển:
                        </MDTypography>
                        <MDTypography
                          color="dark"
                          sx={{ fontSize: '14px', fontWeight: '500' }}
                          variant="body1"
                        >
                          {shipAmount ? formatThousand(shipAmount) : 0}đ
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
                          sx={{ fontSize: '14px', fontWeight: '500' }}
                          variant="body"
                        >
                          Tổng giảm phí vận chuyển:
                        </MDTypography>
                        <MDTypography
                          color="dark"
                          sx={{ fontSize: '14px', fontWeight: '500' }}
                          variant="body1"
                        >
                          - {formatThousand(freeShip)}đ
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
                          {totalAmount
                            ? formatThousand(totalAmount)
                            : formatThousand(getTotalPrice(items))}
                          đ
                        </MDTypography>
                      </Stack>
                    </>
                  ) : null}
                </Paper>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
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
                    }}
                    onClick={() => navigate('/cart')}
                  >
                    Quay lại
                  </MDButton>
                  <MDButton
                    size="medium"
                    color="success"
                    sx={{
                      textTransform: 'initial !important',
                      fontWeight: '500',
                    }}
                    onClick={handleOrder}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      {checkoutLoading ? (
                        <CircularProgress size={20} color="light" />
                      ) : null}
                      <span>Đặt hàng</span>
                    </Stack>
                  </MDButton>
                </Stack>
              </MDBox>
            </Grid>
          </Grid>
        </Container>
      </MDBox>
    </>
  );
};

export default CheckOutPage;
