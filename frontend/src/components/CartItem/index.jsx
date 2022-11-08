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
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../features/cart/cart.slice';
import cartThunk from '../../features/cart/cart.service';

const CartItem = (props) => {
  const { product, quantity, keyIndex, handleDelete } = props;
  const { ram, storage } = product.detailsProduct;
  const { productPictures, name, color, salePrice, regularPrice } = product;
  const [amount, setAmount] = useState(quantity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    if (user.isLoggedIn) {
      let newCartItem = { product: product._id, quantity: amount + 1 };
      dispatch(
        cartThunk.updateCartItemAPI({
          cartItem: newCartItem,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(cartThunk.getAllItemsAPI());
        });
      setAmount(amount + 1);
    } else {
      dispatch(
        cartActions.addToCartItemLocal({
          amount: amount + 1,
          product: product._id,
        })
      );
      setAmount(amount + 1);
    }
  };
  const handleDecrease = () => {
    if (user.isLoggedIn) {
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
    } else {
      if (amount === 1) {
        dispatch(cartActions({ productId: product._id }));
      } else {
        dispatch(
          cartActions.addToCartItemLocal({
            amount: amount - 1,
            product: product._id,
          })
        );
        setAmount(amount - 1);
      }
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
            src={productPictures[0]}
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
              {ram}-{storage}-{color}
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
