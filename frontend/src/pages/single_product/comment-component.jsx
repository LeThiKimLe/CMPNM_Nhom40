import React from 'react';
import { Rating, Box, Stack } from '@mui/material';
import MDTypography from '../../components/MDTypography';

const CommentComponent = (props) => {
  const { product } = props;
  const [value, setValue] = React.useState(2);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'block',
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <MDTypography
        sx={{
          fontWeight: '700',
          color: '#111',
          fontSize: '20px',
        }}
      >
        Đánh giá Điện thoại {product.name}
      </MDTypography>
      <Stack
        alignItems="center"
        justifyContent="flex-start"
        direction="row"
        spacing={1}
        sx={{ marginLeft: '10px' }}
      >
        <MDTypography
          sx={{
            fontWeight: '700',
            color: '#faaf00',
            fontSize: '25px',
          }}
        >
          2.0
        </MDTypography>

        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Stack>
    </Box>
  );
};

export default CommentComponent;
