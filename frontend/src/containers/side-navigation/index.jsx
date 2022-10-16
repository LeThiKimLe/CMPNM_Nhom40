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

const MenuCategories = () => {
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
          <Grid container item xs={12}></Grid>
        </Stack>
      </Container>
    </MDBox>
  );
};

export default MenuCategories;
