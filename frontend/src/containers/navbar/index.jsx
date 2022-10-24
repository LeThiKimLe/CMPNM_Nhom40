import {
  Container,
  Stack,
  Paper,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import MDBox from '../../components/MDBox';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import MDTypography from '../../components/MDTypography';
import SearchIcon from '@mui/icons-material/Search';
import MDButton from '../../components/MDButton';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiLink from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, userActions } from '../../features/user/user.slice';
import NotificationItem from '../../components/NotificationItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const Navbar = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    console.log(event.currentTarget);
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const handleSignOut = () => {
    dispatch(userActions.signout());
  };

  return (
    <MDBox
      color="#000000"
      bgColor="#ffffff"
      variant="contained"
      borderRadius="none"
      opacity={1}
      p={2}
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
                    <MDButton
                      id={`fade-button`}
                      variant="outlined"
                      color="dark"
                      aria-owns={anchorEl ? `simple-menu` : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <AccountCircleIcon
                        sx={{
                          color: '#111111',
                        }}
                      />
                    </MDButton>

                    <Menu
                      id={`simple-menu`}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      MenuListProps={{ onMouseLeave: handleClose }}
                    >
                      <MenuItem onClick={handleClose}>
                        Tài khoản của Tôi
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Đơn mua</MenuItem>
                      <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <MDButton
                    variant="outlined"
                    color="dark"
                    component={Link}
                    to="/sign-in"
                  >
                    <ArrowBackIcon
                      sx={{
                        color: '#111111',
                      }}
                    />
                  </MDButton>
                )}
                <MDButton
                  variant="outlined"
                  color="dark"
                  component={Link}
                  to="/cart"
                >
                  <ShoppingCartIcon
                    sx={{
                      color: '#111111',
                    }}
                  />
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </MDBox>
  );
};

export default Navbar;
