import React, { useState } from 'react';
import { Stack, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MDTypography from '../MDTypography';
import MDBox from '../MDBox';
import MDAvatar from '../MDAvatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { formatThousand } from '../../utils/custom-price';
import { useDispatch } from 'react-redux';
import cartThunk from '../../features/cart/cart.service';
import { getColorProduct } from '../../utils/custom-products';
import { notification } from 'antd';
const colorList = [
  { name: 'Đỏ', value: 'Red' },
  { name: 'Cam', value: 'Orange' },
  { name: 'Vàng', value: 'Yellow' },
  { name: 'Xanh lá cây', value: 'Green' },
  { name: 'Xanh dương', value: 'Blue' },
  { name: 'Tím', value: 'Purple' },
  { name: 'Hồng', value: 'Pink' },
  { name: 'Nâu', value: 'Brown' },
  { name: 'Xám', value: 'Gray' },
  { name: 'Đen', value: 'Black' },
  { name: 'Trắng', value: 'White' },
];

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { product, keyIndex, handleDelete } = props;
  console.log(product);
  const { ram, storage } = product.detailsProduct;
  const { productPicture, name, salePrice, regularPrice, quantity } = product;

  const [amount, setAmount] = useState(quantity);

  const colorName = getColorProduct(product, colorList);
  console.log(colorName);
  const handleIncrease = () => {
    let newCartItem = { product: product._id, quantity: amount + 1 };
    dispatch(
      cartThunk.updateCartItemAPI({
        cartItem: newCartItem,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(cartThunk.getAllItemsAPI());
        setAmount(amount + 1);
      })
      .catch(() => {
        notification.error({
          message: 'Số lượng sản phẩm vượt quá số lượng trong kho!',
          placement: 'top',
        });
      });
  };
  const handleDecrease = () => {
    if (amount === 1) {
      // remove item
      // thông báo lỗi
      dispatch(cartThunk.deleteCartItemAPI(product._id))
        .unwrap()
        .then(() => {
          dispatch(cartThunk.getAllItemsAPI());
        });
    } else {
      let newCartItem = { product: product._id, quantity: amount - 1 };
      dispatch(
        cartThunk.updateCartItemAPI({
          cartItem: newCartItem,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(cartThunk.getAllItemsAPI());
        });
      setAmount(amount - 1);
    }
  };
  return (
    <Stack
      key={keyIndex}
      xs={12}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ marginBottom: '20px' }}
    >
      <Grid xs={5}>
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar
            variant="square"
            src={productPicture}
            name={name}
            size="xl"
          />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography
              display="block"
              sx={{ fontSize: '14px', color: '#111111', fontWeight: '500' }}
            >
              {name}
            </MDTypography>
            <MDTypography sx={{ color: '#5b5b5b' }} variant="overline">
              {ram}-{storage}-{colorName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </Grid>
      <Grid xs={3}>
        <Stack direction="row" spacing={1}>
          <MDTypography
            sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#000000' }}
          >
            {formatThousand(Number(salePrice))}đ
          </MDTypography>
          <MDTypography
            sx={{
              fontSize: '0.875rem',
              fontWeight: '400',
              textDecoration: 'line-through',
              color: '#5b5b5b',
            }}
          >
            {formatThousand(Number(regularPrice))}đ
          </MDTypography>
        </Stack>
      </Grid>
      <Grid xs={1.5}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <IconButton
            variant="outlined"
            size="small"
            aria-label="delete"
            color="dark"
            onClick={handleDecrease}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <MDTypography
            sx={{
              borderRadius: '0.3rem',
              padding: '1px 1px',
              color: '#000000',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '500',
            }}
            variant="outlined"
          >
            {amount}
          </MDTypography>
          <IconButton
            variant="outlined"
            size="small"
            aria-label="delete"
            color="dark"
            onClick={handleIncrease}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid xs={1.5}>
        {' '}
        <MDTypography
          color="dark"
          sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#000000' }}
        >
          {formatThousand(Number(salePrice) * quantity)}đ
        </MDTypography>
      </Grid>
      <Grid xs={2}>
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{
              borderRadius: '8px',
              border: '1px solid #999999',
              paddingLeft: '15px',
              paddingRight: '15px',
            }}
          >
            <FavoriteIcon fontSize="small" color="primary" />
          </IconButton>

          <IconButton
            size="smaill"
            sx={{
              borderRadius: '8px',
              border: '1px solid #999999',
              paddingLeft: '15px',
              paddingRight: '15px',
            }}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" color="dark" />
          </IconButton>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default CartItem;
