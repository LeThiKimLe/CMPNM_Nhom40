import {
  Container,
  Stack,
  Paper,
  IconButton,
  InputBase,
  Menu,
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiLink from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, userActions } from '../../features/user/user.slice';
import NotificationItem from '../../components/NotificationItem';
const Navbar = () => {
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  const handleSignOut = () => {
    dispatch(userActions.signout());
  };

  const handleCloseMenu = (e) => setOpenMenu(false);
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      sx={{ marginTop: '10px' }}
      open={Boolean(openMenu)}
    >
      <NotificationItem title="Tài khoản" />
      <NotificationItem title="Đơn mua" />
      <NotificationItem title="Đăng xuất" />
    </Menu>
  );
  return (
    <MDBox
      color="white"
      bgColor="info"
      variant="contained"
      borderRadius="none"
      opacity={1}
      p={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Container>
        <Stack direction="row">
          <Grid container item xs={12} spacing={7}>
            <Grid item xs={2} justifyContent="flex-start">
              <Stack
                direction="row"
                spacing={2}
                display="flex"
                alignItems="center"
              >
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
            <Grid item xs={2} alignItems="center" justifyContent="flex-end">
              <Stack direction="row" spacing={3}>
                <MDButton variant="outlined" component={Link} to="/cart">
                  <ShoppingCartIcon />
                </MDButton>
                {isLoggedIn ? (
                  <MDButton variant="outlined" onClick={handleSignOut}>
                    <ArrowForwardIcon />
                  </MDButton>
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
