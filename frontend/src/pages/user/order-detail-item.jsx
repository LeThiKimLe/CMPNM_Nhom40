import React from 'react';
import { getColorProduct } from '../../utils/custom-products';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import MDBox from '../../components/MDBox';
import MDAvatar from '../../components/MDAvatar';
import { formatThousand } from '../../utils/custom-price';
const OrderDetailItem = (props) => {
  const { item } = props;
  const { productId, purchasedQty } = item;
  const { salePrice, productPictures, name, ram, storage, color } = productId;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Grid xs={4}>
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar
            variant="square"
            src={productPictures[0]}
            name={name}
            size="md"
          />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography
              display="block"
              sx={{
                fontSize: '14px',
                color: '#111111',
                fontWeight: '600',
              }}
            >
              {name}
            </MDTypography>
            <MDTypography
              color="primary"
              sx={{ fontWeight: '600', color: '#0b5394' }}
              variant="overline"
            >
              {formatThousand(salePrice)}đ x {purchasedQty}
            </MDTypography>
          </MDBox>
        </MDBox>
      </Grid>
      <Grid xs={4}>
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          {' '}
          <MDTypography
            sx={{
              color: '#7d879c',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            {ram} - {storage} - {color}
          </MDTypography>
        </Stack>
      </Grid>
      <Grid xs={4}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <MDButton
            size="medium"
            variant="text"
            sx={{
              textTransform: 'initial !important',
              fontWeight: '500',
              color: '#0b5394',
            }}
          >
            Write a review
          </MDButton>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default OrderDetailItem;
