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
import { notification } from 'antd';

import Grid from '@mui/material/Unstable_Grid2';
import React, { useState, useEffect } from 'react';
import MDBox from '../../components/MDBox';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.css';
import logo from '../../assets/images/tmshop.png';
import userThunk from '../../features/user/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, userActions } from '../../features/user/user.slice';
import { cartActions } from '../../features/cart/cart.slice';
import { addressActions } from '../../features/address/address.slice';
import { formatThousand } from '../../utils/custom-price';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [phrase, setPhrase] = useState('');
  const [showItems, setShowItems] = useState(true);

  const handlePhraseChange = (e) => {
    if (e.target.value === '') {
      setShowItems(false);
      setPhrase('');
      return;
    }
    setShowItems(true);
    dispatch(userThunk.searchProductAPI(e.target.value))
      .unwrap()
      .then((data) => {
        setSuggestions(data);
      })
      .catch(() => setSuggestions([]));
    setPhrase(e.target.value);
  };

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
  function handleOnClick(categorySlug, ram, storage) {
    setShowItems(false);
    setSuggestions([]);
    setPhrase('');
  }
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const handleSignOut = () => {
    // const pathname = location.pathname.replace('/', '');
    dispatch(userActions.signout());
    dispatch(cartActions.reset());
    dispatch(addressActions.reset());
    notification.success({
      message: 'Đăng xuất thành công!',
      placement: 'top',
    });
    navigate('/');
  };
  const [suggestions, setSuggestions] = useState([]);

  const suggestionListHeight = suggestions.length * 67.5;
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
    >
      <Container>
        <Grid xs={12} container display="flex" justifyContent="space-between">
          <Stack
            direction="row"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="logo" width="100px" height="50px" />
          </Stack>
          <Grid xs={8}>
            <Stack
              direction="row"
              display="flex"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Paper
                component="form"
                sx={{
                  display: 'flex',
                  borderRadius: '10px',
                }}
                variant="outlined"
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: '14px', width: '800px' }}
                  placeholder="Tìm kiếm sản phẩm..."
                  value={phrase}
                  onChange={handlePhraseChange}
                />{' '}
                <IconButton type="button" sx={{ p: '10px' }}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Stack>

            {suggestions.length !== 0 && showItems && (
              <div
                className="suggestion-list"
                style={{ height: `${suggestionListHeight}px` }}
              >
                {suggestions.map((suggestion, key) => {
                  const { ram, storage } = suggestion.detailsProduct;
                  return (
                    <Link
                      onClick={() =>
                        handleOnClick(suggestion.category, ram, storage)
                      }
                      to={`/product-page/${suggestion.category}?ram=${ram}&storage=${storage}`}
                      key={key}
                    >
                      <div className="suggestion-item">
                        <img
                          src={suggestion.productPictures[0]}
                          alt={suggestion.name}
                        />
                        <div className="suggestion-item-details">
                          <div className="suggestion-item-name">
                            {suggestion.name}
                          </div>
                          <div className="suggestion-item-price">
                            <div className="sale-price">
                              {formatThousand(suggestion.salePrice)}đ
                            </div>
                            <div className="regular-price">
                              {formatThousand(suggestion.regularPrice)}đ{' '}
                            </div>
                            <div className="sale">{suggestion.sale}%</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </Grid>
          <Stack
            direction="row"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            spacing={3}
          >
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
      </Container>
    </MDBox>
  );
};

export default Navbar;
