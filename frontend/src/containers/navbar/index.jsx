import { Container, Stack, Paper, IconButton, InputBase } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import MDBox from '../../components/MDBox';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import MDTypography from '../../components/MDTypography';
import SearchIcon from '@mui/icons-material/Search';
import MDButton from '../../components/MDButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import MuiLink from '@mui/material/Link';
const Navbar = () => {
  return (
    <MDBox
      color="white"
      bgColor="dark"
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
                  href="#"
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
                  <FontAwesomeIcon icon={faShoppingCart} />
                </MDButton>
                <MDButton variant="outlined" component={Link} to="/sign-in">
                  <FontAwesomeIcon icon={faUser} />
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
