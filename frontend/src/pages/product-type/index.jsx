import React from 'react';
import { Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
const ProductPage = () => {
  return (
    <MDBox
      color="#000000"
      bgColor="Light"
      variant="contained"
      borderRadius="none"
      opacity={1}
      display="flex"
      justifyContent="flex-start"
      width="100%"
      alignItems="flex-start"
      minHeight="75vh"
    >
      <Container>
        <Grid
          sx={{ paddingTop: '15px' }}
          container
          spacing={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <Stack display="flex" justifyContent="center" alignItems="center">
            <MDBox p={2}>
              <h1>ProductPage</h1>
            </MDBox>
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default ProductPage;
