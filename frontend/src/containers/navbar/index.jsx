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

  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const handleSignOut = () => {
    dispatch(userActions.signout());
  };

  return (
    <MDBox
      color="white"
      bgColor="info"
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
                  color="white"
                >
                  <AdbIcon color="inherit" />
                </MDTypography>
                <MDTypography variant="h4" fontWeight="bold" color={'white'}>
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
                <MDButton variant="outlined" component={Link} to="/cart">
                  <ShoppingCartIcon />
                </MDButton>
                {isLoggedIn ? (
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <MDButton
                          variant="outlined"
                          {...bindTrigger(popupState)}
                        >
                          <AccountCircleIcon />
                        </MDButton>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>
                            Tài khoản
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            Đơn mua
                          </MenuItem>
                          <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                ) : (
                  <MDButton variant="outlined" component={Link} to="/sign-in">
                    <ArrowBackIcon />
                  </MDButton>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </MDBox>
  );
};

export default Navbar;
