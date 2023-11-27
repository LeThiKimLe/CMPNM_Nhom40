import React from 'react';
import { Snackbar } from '@mui/material';
const SnackbarCustom = ({ vertical, horizontal, open, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      message={message}
      key={vertical + horizontal}
    />
  );
};

export default SnackbarCustom;
