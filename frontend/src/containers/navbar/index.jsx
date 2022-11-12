import {
  Container,
  Stack,
  Paper,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState, useEffect } from 'react';
import MDBox from '../../components/MDBox';
import { Link, useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import MDTypography from '../../components/MDTypography';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiLink from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, userActions } from '../../features/user/user.slice';
import { cartActions } from '../../features/cart/cart.slice';
import { addressActions } from '../../features/address/address.slice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const cart = useSelector((state) => state.cart);
  const cartItemsLocal =
    localStorage.getItem('cartItems') == null
      ? null
      : JSON.parse(localStorage.getItem('cartItems'));
  const [cartAmount, setCartAmount] = useState(0);
  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }
  function handleClose() {
    setAnchorEl(null);
  }
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const handleSignOut = () => {
    // const pathname = location.pathname.replace('/', '');
    dispatch(userActions.signout());
    dispatch(cartActions.reset());
    dispatch(addressActions.reset());
    navigate('/');
  };
  useEffect(() => {
    if (!isLoggedIn) {
      if (cartItemsLocal === null) {
        setCartAmount(0);
      } else {
        setCartAmount(cartItemsLocal.length);
      }
    } else {
      setCartAmount(cart.cartItems.length);
    }
  }, [cart, cartItemsLocal, isLoggedIn]);
  return (
    <MDBox
      color="#000000"
      bgColor="#ffffff"
      variant="contained"
      borderRadius="none"
      opacity={1}
      sx={{
        paddingTop: '10px',
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Container>
        <Stack direction="row">
          <Grid container item xs={12} spacing={7}>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Stack direction="row" spacing={2}>
                <MDTypography
                  component={MuiLink}
                  href="/"
                  variant="body1"
                  sx={{
                    color: '#111111',
                  }}
                >
                  <AdbIcon color="inherit" />
                </MDTypography>
                <MDTypography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    color: '#111111',
                  }}
                >
                  LOGO
                </MDTypography>
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Paper
                component="form"
                sx={{
                  display: 'flex',
                  width: '100%',
                }}
                variant="outlined"
              >
                <InputBase sx={{ ml: 1, flex: 1 }} />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid
              item
              xs={2}
              direction="row"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-end"
            >
              <Stack direction="row" spacing={3}>
                {isLoggedIn ? (
                  <>
                    <IconButton
                      id={`fade-button`}
                      aria-owns={anchorEl ? `simple-menu` : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                      sx={{
                        borderRadius: '8px',
                        border: '1px solid #111111',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                      }}
                    >
                      <AccountCircleIcon
                        sx={{
                          color: '#111111',
                        }}
                      />
                    </IconButton>

                    <Menu
                      id={`simple-menu`}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      MenuListProps={{ onMouseLeave: handleClose }}
                    >
                      <MenuItem onClick={() => navigate('/user/profile')}>
                        Tài khoản của Tôi
                      </MenuItem>
                      <MenuItem onClick={() => navigate('/user/order')}>
                        Đơn mua
                      </MenuItem>
                      <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <IconButton
                    component={Link}
                    to="/sign-in"
                    sx={{
                      borderRadius: '8px',
                      border: '1px solid #111111',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                    }}
                  >
                    <ArrowBackIcon color="dark" />
                  </IconButton>
                )}

                <Badge
                  badgeContent={cartAmount === 0 ? 0 : cartAmount}
                  color="secondary"
                >
                  <IconButton
                    component={Link}
                    to="/cart"
                    sx={{
                      borderRadius: '8px',
                      border: '1px solid #111111',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                    }}
                  >
                    <ShoppingCartIcon color="dark" />
                  </IconButton>
                </Badge>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </MDBox>
  );
};

export default Navbar;
