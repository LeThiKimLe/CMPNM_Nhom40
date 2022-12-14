import { Pagination } from '@mui/material';
import React, { useState } from 'react';
import MDBox from '../../components/MDBox';

const ProductPagination = (props) => {
  const { count } = props;
  return (
    <MDBox
      justifyContent="center"
      alignItems="center"
      display="flex"
      p={1}
      m={1}
    >
      <Pagination count={count} />
    </MDBox>
  );
};

export default ProductPagination;
