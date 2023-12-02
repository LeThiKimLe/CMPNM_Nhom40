/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from 'react';
import MDTypography from '../../components/MDTypography';
import { Stack, Paper, Chip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { formatThousand } from '../../utils/custom-price';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const OrderItem2 = (props) => {
  const { id, totalAmount, orderStatus } = props;
  const datePurchased = orderStatus[0].date;
  return (
    <Paper
      key={id}
      elevation={0}
      sx={{
        paddingTop: '7px',
        paddingBottom: '7px',
        borderRadius: '8px',
        marginBottom: '10px',
      }}
    >
      <Stack
        component={Link}
        to={`/user/order/${id}`}
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={4}>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#2b3445',
            }}
          >
            {id}
          </MDTypography>
        </Grid>
        <Grid xs={3}>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#2b3445',
            }}
          >
            {new Date(datePurchased).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric',
            })}
          </MDTypography>
        </Grid>
        <Grid xs={4}>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#2b3445',
            }}
          >
            {formatThousand(totalAmount)}đ
          </MDTypography>
        </Grid>
        <Grid xs={1}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
            sx={{ paddingRight: '10px' }}
          >
            <ArrowForwardIcon />
          </Stack>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default OrderItem2;
