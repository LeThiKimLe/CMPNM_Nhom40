import { Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import MDBox from '../../components/MDBox';
import FadeMenu from '../categories';

const MenuCategories = () => {
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
          <Grid container item xs={12}></Grid>
        </Stack>
      </Container>
    </MDBox>
  );
};

export default MenuCategories;
