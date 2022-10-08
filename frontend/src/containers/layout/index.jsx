import { Grid } from '@mui/material';
import React from 'react';
import Header from '../header';
import Container from '@mui/material/Container';
const MainLayout = ({ children }) => {
  return (
    <Container>
      <Grid>
        <Header />
      </Grid>
      {children}
    </Container>
  );
};

export default MainLayout;
