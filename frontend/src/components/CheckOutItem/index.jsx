import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/material';
import MDAvatar from '../MDAvatar';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import { formatThousand } from '../../utils/custom-price';
import { getColorProduct } from '../../utils/custom-products';
const CheckOutItem = (props) => {
  const { product, keyIndex } = props;
  const data = useSelector((state) => state.data);
  const { ram, storage } = product.detailsProduct;
  const { productPicture, name, salePrice, regularPrice, quantity } = product;
  const colorName = getColorProduct(product, data.colors);
  return (
    <Grid
      key={keyIndex}
      container
      xs={12}
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ marginBottom: '20px' }}
    >
      <Grid xs={4}>
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar
            variant="square"
            src={productPicture}
            name={name}
            size="sm"
          />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography
              display="block"
              sx={{
                fontSize: '14px',
                color: '#344767',
                fontWeight: '500',
              }}
            >
              {name}
            </MDTypography>
          </MDBox>
        </MDBox>
      </Grid>
      {/* details */}
      <Grid xs={2.5}>
        <Stack direction="row" spacing={1}>
          <MDTypography
            sx={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#344767',
            }}
          >
            {ram} - {storage} - {colorName}
          </MDTypography>
        </Stack>
      </Grid>
      {/* price */}
      <Grid xs={2}>
        <Stack direction="row" spacing={1}>
          <MDTypography
            sx={{ fontSize: '0.875rem', fontWeight: '500', color: '#344767' }}
          >
            {formatThousand(Number(salePrice))}đ
          </MDTypography>
          <MDTypography
            sx={{
              fontSize: '0.875rem',
              fontWeight: '400',
              textDecoration: 'line-through',
              color: '#344767',
            }}
          >
            {formatThousand(Number(regularPrice))}đ
          </MDTypography>
        </Stack>
      </Grid>
      {/* quantity */}
      <Grid xs={1.5}>
        {' '}
        <MDTypography
          sx={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#344767',
          }}
        >
          {quantity}
        </MDTypography>
      </Grid>
      <Grid xs={2}>
        <Stack direction="row" spacing={1}>
          <MDTypography
            sx={{
              color: '#344767',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            {formatThousand(Number(salePrice) * quantity)}đ
          </MDTypography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CheckOutItem;
