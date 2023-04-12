import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MDTypography from '../../components/MDTypography';
import MDBox from '../../components/MDBox';
const DetailProductItem = (props) => {
  const { title, value, color } = props;
  return (
    <MDBox variant="contained" bgColor={color}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        display="flex"
        xs={12}
        sx={{
          backgroundColor: { color },
        }}
      >
        <Grid item xs={4} justifyContent="flex-start" alignItems="center">
          <MDTypography sx={{ fontSize: '14px', color: '#333333' }}>
            {title}
          </MDTypography>
        </Grid>
        <Grid item xs={8} justifyContent="flex-start" alignItems="center">
          <MDTypography sx={{ fontSize: '14px', color: '#333333' }}>
            {value}
          </MDTypography>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default DetailProductItem;
